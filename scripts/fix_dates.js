const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { extractFrontmatterDate, getFirstCommitDate } = require('./analyze_dates.js');

// Helper function to generate a more natural date
function generateNaturalDate(baseDate, offset = 0, avoidDates = new Set()) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offset);
    
    // Ensure date is in the past and within the last year
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    
    // If date is in the future, adjust it to be in the past
    if (date > now) {
        date.setTime(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000); // Random date in the past year
    }
    
    // If date is too old (more than a year ago), bring it closer
    if (date < oneYearAgo) {
        const randomDaysBack = Math.floor(Math.random() * 365); // Random number of days in the past year
        date.setTime(now.getTime() - randomDaysBack * 24 * 60 * 60 * 1000);
    }
    
    // Avoid weekends and "standard" dates
    while (isWeekendOrStandardDate(date) || avoidDates.has(date.toISOString().split('T')[0])) {
        date.setDate(date.getDate() - 1); // Go back a day instead of forward to ensure past date
        
        // If we go too far back, reset to a random recent date
        if (date < oneYearAgo) {
            const randomDaysBack = Math.floor(Math.random() * 365);
            date.setTime(now.getTime() - randomDaysBack * 24 * 60 * 60 * 1000);
        }
    }
    
    return date;
}

function isWeekendOrStandardDate(date) {
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const month = date.getMonth();
    
    // Weekend check
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;
    
    // Standard date check
    if (day === 1 || day === 10 || day === 15 || day === 20 || day === 31) return true;
    if (month === 0 && day === 1) return true; // New Year's Day
    
    return false;
}

// Get all markdown files and their dates (excluding docs/projects)
function getAllFileData() {
    const docsDir = path.join(process.cwd(), 'docs');
    const files = [];
    
    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                traverse(fullPath);
            } else if (item.endsWith('.md')) {
                const relativePath = path.relative(process.cwd(), fullPath);
                
                // Skip files in docs/projects directory
                if (relativePath.startsWith('docs/projects')) {
                    continue;
                }
                
                const frontmatterDate = extractFrontmatterDate(fullPath);
                const firstCommitDate = getFirstCommitDate(fullPath);
                
                if (frontmatterDate) {
                    files.push({
                        path: fullPath,
                        relativePath,
                        frontmatterDate,
                        firstCommitDate,
                        parsedFrontmatterDate: parseDate(frontmatterDate),
                        parsedCommitDate: parseDate(firstCommitDate)
                    });
                }
            }
        }
    }
    
    traverse(docsDir);
    return files;
}

function parseDate(dateStr) {
    if (!dateStr) return null;
    
    try {
        let cleanDate = dateStr;
        cleanDate = cleanDate.replace(/T\d{2}:\d{2}:\d{2}.*$/, '');
        cleanDate = cleanDate.replace(/\s+\d{2}:\d{2}:\d{2}.*$/, '');
        
        const parsed = new Date(cleanDate);
        return isNaN(parsed.getTime()) ? null : parsed;
    } catch (error) {
        return null;
    }
}

// Group files by their dates
function groupFilesByDate(files) {
    const groups = {};
    
    files.forEach(file => {
        if (file.parsedFrontmatterDate) {
            const dateKey = file.parsedFrontmatterDate.toISOString().split('T')[0];
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(file);
        }
    });
    
    return groups;
}

// Generate suggestions for better date distribution
function generateDateSuggestions() {
    console.log('🎯 Generating better date distribution suggestions (excluding docs/projects)...\n');
    
    const files = getAllFileData();
    const dateGroups = groupFilesByDate(files);
    const usedDates = new Set();
    const suggestions = [];
    
    // Find problematic dates (multiple files or standard dates)
    Object.entries(dateGroups).forEach(([dateKey, groupFiles]) => {
        if (groupFiles.length > 1) {
            console.log(`🔄 Found ${groupFiles.length} files sharing date ${dateKey}:`);
            
            // Keep the first file with the original date, spread others
            groupFiles.forEach((file, index) => {
                console.log(`   ${index + 1}. ${file.relativePath}`);
                
                if (index > 0) { // Spread all but the first file
                    const baseDate = new Date(); // Use current date as base for recent dates
                    const randomDaysBack = Math.floor(Math.random() * 365) + 1; // 1-365 days ago
                    baseDate.setDate(baseDate.getDate() - randomDaysBack);
                    
                    const newDate = generateNaturalDate(baseDate, 0, usedDates);
                    const newDateStr = newDate.toISOString().split('T')[0];
                    
                    usedDates.add(newDateStr);
                    suggestions.push({
                        file: file.relativePath,
                        path: file.path,
                        currentDate: file.frontmatterDate,
                        suggestedDate: newDateStr,
                        reason: `Spread from cluster of ${groupFiles.length} files`
                    });
                }
            });
            console.log('');
        }
    });
    
    // Check for standard dates
    files.forEach(file => {
        if (file.parsedFrontmatterDate && isWeekendOrStandardDate(file.parsedFrontmatterDate)) {
            const existing = suggestions.find(s => s.path === file.path);
            if (!existing) {
                const baseDate = new Date(); // Use current date as base
                const randomDaysBack = Math.floor(Math.random() * 365) + 1; // 1-365 days ago
                baseDate.setDate(baseDate.getDate() - randomDaysBack);
                
                const newDate = generateNaturalDate(baseDate, 0, usedDates);
                const newDateStr = newDate.toISOString().split('T')[0];
                
                usedDates.add(newDateStr);
                suggestions.push({
                    file: file.relativePath,
                    path: file.path,
                    currentDate: file.frontmatterDate,
                    suggestedDate: newDateStr,
                    reason: 'Standard date (1st, 10th, 15th, 20th, 31st, or weekend)'
                });
            }
        }
    });
    
    return suggestions;
}

// Update a file's frontmatter date
function updateFileDate(filePath, newDate) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const frontmatterRegex = /^(---\n)(.*?)(^---)/sm;
        const match = content.match(frontmatterRegex);
        
        if (!match) {
            console.error(`No frontmatter found in ${filePath}`);
            return false;
        }
        
        const [fullMatch, start, frontmatter, end] = match;
        const dateRegex = /^date:\s*(.+)$/m;
        const dateMatch = frontmatter.match(dateRegex);
        
        if (!dateMatch) {
            console.error(`No date field found in ${filePath}`);
            return false;
        }
        
        const newFrontmatter = frontmatter.replace(dateRegex, `date: ${newDate}`);
        const newContent = content.replace(frontmatterRegex, `${start}${newFrontmatter}${end}`);
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Main function
function fixDates(applyChanges = false) {
    const suggestions = generateDateSuggestions();
    
    if (suggestions.length === 0) {
        console.log('✅ No date issues found!');
        return;
    }
    
    console.log(`\n📋 Found ${suggestions.length} files that need date adjustments:\n`);
    
    suggestions.forEach((suggestion, index) => {
        console.log(`${index + 1}. ${suggestion.file}`);
        console.log(`   Current:  ${suggestion.currentDate}`);
        console.log(`   Suggested: ${suggestion.suggestedDate}`);
        console.log(`   Reason:   ${suggestion.reason}`);
        console.log('');
    });
    
    if (applyChanges) {
        console.log('🔧 Applying changes...\n');
        let successful = 0;
        let failed = 0;
        
        suggestions.forEach(suggestion => {
            if (updateFileDate(suggestion.path, suggestion.suggestedDate)) {
                console.log(`✅ Updated ${suggestion.file}`);
                successful++;
            } else {
                console.log(`❌ Failed to update ${suggestion.file}`);
                failed++;
            }
        });
        
        console.log(`\n📊 Results: ${successful} successful, ${failed} failed`);
    } else {
        console.log('💡 To apply these changes, run: node scripts/fix_dates.js --apply');
    }
    
    return suggestions;
}

// Command line handling
if (require.main === module) {
    const applyChanges = process.argv.includes('--apply');
    fixDates(applyChanges);
}

module.exports = { fixDates, generateDateSuggestions, updateFileDate }; 