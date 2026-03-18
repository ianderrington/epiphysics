const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to extract frontmatter date from a markdown file
function extractFrontmatterDate(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const frontmatterMatch = content.match(/^---\n(.*?)\n---/s);
        
        if (!frontmatterMatch) return null;
        
        const frontmatter = frontmatterMatch[1];
        const dateMatch = frontmatter.match(/^date:\s*(.+)$/m);
        
        if (!dateMatch) return null;
        
        // Clean up the date string
        let dateStr = dateMatch[1].trim();
        // Remove quotes if present
        dateStr = dateStr.replace(/^["']|["']$/g, '');
        
        return dateStr;
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return null;
    }
}

// Function to get the first commit date for a file
function getFirstCommitDate(filePath) {
    try {
        const command = `git log --reverse --format="%ci" --follow -- "${filePath}" | head -1`;
        const result = execSync(command, { encoding: 'utf8' }).trim();
        return result || null;
    } catch (error) {
        console.error(`Error getting git history for ${filePath}:`, error.message);
        return null;
    }
}

// Function to get all markdown files recursively
function getAllMarkdownFiles(dir) {
    const files = [];
    
    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                traverse(fullPath);
            } else if (item.endsWith('.md')) {
                files.push(fullPath);
            }
        }
    }
    
    traverse(dir);
    return files;
}

// Function to parse various date formats
function parseDate(dateStr) {
    if (!dateStr) return null;
    
    try {
        // Handle various date formats
        let cleanDate = dateStr;
        
        // Remove timezone info that might confuse parsing
        cleanDate = cleanDate.replace(/T\d{2}:\d{2}:\d{2}.*$/, '');
        cleanDate = cleanDate.replace(/\s+\d{2}:\d{2}:\d{2}.*$/, '');
        
        const parsed = new Date(cleanDate);
        return isNaN(parsed.getTime()) ? null : parsed;
    } catch (error) {
        return null;
    }
}

// Function to check if a date falls on "standard" days (1st, 15th of month, or exact year boundaries)
function isStandardDate(date) {
    if (!date) return false;
    
    const day = date.getDate();
    const month = date.getMonth(); // 0-based
    
    // Check for 1st or 15th of month
    if (day === 1 || day === 15) return true;
    
    // Check for New Year's Day
    if (month === 0 && day === 1) return true;
    
    // Check for other "round" dates
    if (day === 10 || day === 20 || day === 31) return true;
    
    return false;
}

// Main analysis function
function analyzeDates() {
    console.log('🔍 Analyzing markdown frontmatter dates vs git commit history...\n');
    
    const docsDir = path.join(process.cwd(), 'docs');
    const markdownFiles = getAllMarkdownFiles(docsDir);
    
    const results = [];
    let standardDateCount = 0;
    let totalWithDates = 0;
    
    for (const filePath of markdownFiles) {
        const relativePath = path.relative(process.cwd(), filePath);
        const frontmatterDate = extractFrontmatterDate(filePath);
        const firstCommitDate = getFirstCommitDate(filePath);
        
        if (frontmatterDate) {
            totalWithDates++;
            const parsedFrontmatterDate = parseDate(frontmatterDate);
            const parsedCommitDate = parseDate(firstCommitDate);
            
            const isStandard = isStandardDate(parsedFrontmatterDate);
            if (isStandard) standardDateCount++;
            
            const daysDiff = parsedFrontmatterDate && parsedCommitDate 
                ? Math.round((parsedFrontmatterDate - parsedCommitDate) / (1000 * 60 * 60 * 24))
                : null;
            
            results.push({
                file: relativePath,
                frontmatterDate,
                firstCommitDate,
                parsedFrontmatterDate,
                parsedCommitDate,
                daysDiff,
                isStandardDate: isStandard
            });
        }
    }
    
    // Sort by frontmatter date
    results.sort((a, b) => {
        if (!a.parsedFrontmatterDate && !b.parsedFrontmatterDate) return 0;
        if (!a.parsedFrontmatterDate) return 1;
        if (!b.parsedFrontmatterDate) return -1;
        return a.parsedFrontmatterDate - b.parsedFrontmatterDate;
    });
    
    console.log(`📊 SUMMARY:`);
    console.log(`Total files with dates: ${totalWithDates}`);
    console.log(`Files with "standard" dates: ${standardDateCount} (${Math.round(standardDateCount/totalWithDates*100)}%)`);
    console.log(`\n📅 DATE ANALYSIS:\n`);
    
    // Group by date patterns
    const dateGroups = {};
    results.forEach(result => {
        if (result.parsedFrontmatterDate) {
            const dateKey = result.parsedFrontmatterDate.toISOString().split('T')[0];
            if (!dateGroups[dateKey]) dateGroups[dateKey] = [];
            dateGroups[dateKey].push(result);
        }
    });
    
    // Show dates with multiple files
    console.log('🗓️  DATES WITH MULTIPLE FILES:');
    Object.entries(dateGroups)
        .filter(([date, files]) => files.length > 1)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([date, files]) => {
            console.log(`\n${date} (${files.length} files):`);
            files.forEach(file => {
                console.log(`  - ${file.file}`);
            });
        });
    
    console.log('\n📋 DETAILED RESULTS:\n');
    console.log('File | Frontmatter Date | First Commit | Days Diff | Standard Date?');
    console.log('-'.repeat(120));
    
    results.forEach(result => {
        const file = result.file.length > 40 ? '...' + result.file.slice(-37) : result.file;
        const frontDate = result.frontmatterDate || 'N/A';
        const commitDate = result.firstCommitDate ? result.firstCommitDate.split(' ')[0] : 'N/A';
        const diff = result.daysDiff !== null ? `${result.daysDiff}d` : 'N/A';
        const standard = result.isStandardDate ? '⚠️  YES' : 'No';
        
        console.log(`${file.padEnd(40)} | ${frontDate.padEnd(20)} | ${commitDate.padEnd(12)} | ${diff.padEnd(8)} | ${standard}`);
    });
    
    // Show suggestions for dates that need spreading
    console.log('\n💡 SUGGESTIONS:');
    
    const standardDates = results.filter(r => r.isStandardDate);
    if (standardDates.length > 0) {
        console.log('\n⚠️  Files with "standard" dates that could be spread out:');
        standardDates.forEach(result => {
            console.log(`  - ${result.file}: ${result.frontmatterDate}`);
        });
    }
    
    const duplicateDates = Object.entries(dateGroups)
        .filter(([date, files]) => files.length > 1);
    
    if (duplicateDates.length > 0) {
        console.log('\n🔄 Files sharing the same date:');
        duplicateDates.forEach(([date, files]) => {
            console.log(`  ${date}:`);
            files.forEach(file => {
                console.log(`    - ${file.file}`);
            });
        });
    }
    
    return results;
}

// Function to generate better distributed dates
function generateBetterDates(results) {
    console.log('\n🎯 GENERATING BETTER DATE DISTRIBUTION:\n');
    
    const filesToUpdate = results.filter(r => r.isStandardDate || 
        Object.entries(dateGroups).some(([date, files]) => 
            files.length > 1 && files.some(f => f.file === r.file)
        )
    );
    
    console.log('Suggested date changes:');
    filesToUpdate.forEach((result, index) => {
        const baseDate = result.parsedCommitDate || result.parsedFrontmatterDate;
        if (baseDate) {
            // Create a more natural date by adding some offset
            const offset = Math.floor(Math.random() * 20) - 10; // ±10 days
            const newDate = new Date(baseDate);
            newDate.setDate(newDate.getDate() + offset);
            
            // Avoid weekends and "standard" dates
            while (isStandardDate(newDate) || newDate.getDay() === 0 || newDate.getDay() === 6) {
                newDate.setDate(newDate.getDate() + 1);
            }
            
            console.log(`${result.file}:`);
            console.log(`  Current: ${result.frontmatterDate}`);
            console.log(`  Suggested: ${newDate.toISOString().split('T')[0]}`);
            console.log('');
        }
    });
}

// Run the analysis
if (require.main === module) {
    const results = analyzeDates();
    // generateBetterDates(results); // Uncomment to see date suggestions
}

module.exports = { analyzeDates, extractFrontmatterDate, getFirstCommitDate }; 