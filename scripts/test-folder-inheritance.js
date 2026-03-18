#!/usr/bin/env node

/**
 * Test script to verify folder-level frontmatter inheritance
 * This script tests the new folder config system
 */

const path = require('path');

async function testFolderInheritance() {
  console.log('🧪 Testing Folder-Level Frontmatter Inheritance\n');
  console.log('='.repeat(60));

  try {
    // Import the modules (ESM modules require dynamic import in CommonJS)
    const { collectFolderConfigs } = await import('../src/lib/content/pages-config.ts');
    const { mergeFrontmatter } = await import('../src/lib/content/frontmatter-merge.ts');

    // Test file paths
    const testFiles = [
      'docs/musings/building_code/ai-customizability.md',
      'docs/fiction/the_resonance/resonance_7.md',
      'docs/projects/supernal/index.md',
    ];

    for (const testFile of testFiles) {
      const absolutePath = path.join(process.cwd(), testFile);
      console.log(`\n📄 Testing: ${testFile}`);
      console.log('-'.repeat(60));

      // Collect folder configs
      const configs = await collectFolderConfigs(absolutePath);
      
      if (configs.length === 0) {
        console.log('   ⚠️  No folder configs found');
        continue;
      }

      console.log(`   ✅ Found ${configs.length} folder config(s)`);
      
      // Show the inheritance chain
      console.log('   📚 Config inheritance chain (specific → general):');
      configs.forEach((config, index) => {
        if (config.defaults) {
          console.log(`      ${index + 1}. Has defaults (TTS: ${config.defaults.tts?.enabled ? 'enabled' : 'disabled'})`);
          if (config.defaults.tts) {
            console.log(`         Voice: ${config.defaults.tts.voice || 'default'}`);
          }
        }
      });

      // Test merge with sample file frontmatter
      const sampleFileFrontmatter = {
        title: 'Test Post',
        date: '2025-01-01',
        // TTS not specified - should inherit from folder config
      };

      // Merge configs from general to specific
      let baseDefaults = {};
      for (let i = configs.length - 1; i >= 0; i--) {
        if (configs[i].defaults) {
          baseDefaults = mergeFrontmatter(baseDefaults, configs[i].defaults);
        }
      }

      // Merge with file frontmatter
      const merged = mergeFrontmatter(baseDefaults, sampleFileFrontmatter);

      console.log('\n   📋 Merged result:');
      console.log(`      TTS Enabled: ${merged.tts?.enabled ? 'Yes' : 'No'}`);
      console.log(`      TTS Voice: ${merged.tts?.voice || 'N/A'}`);
      console.log(`      TTS Provider: ${merged.tts?.provider || 'N/A'}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Test completed successfully!\n');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testFolderInheritance();

