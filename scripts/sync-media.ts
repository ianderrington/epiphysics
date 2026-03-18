import { Command } from 'commander';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { MediaSyncService } from '../src/services/mediaSync';
import { MediaSyncConfig } from '../src/interfaces/mediaSyncConfig';

// Load environment variables
config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const syncConfig: MediaSyncConfig = {
  contentRoot: 'docs',
  registryPath: '.media-registry.json',
  bucket: process.env.MEDIA_SYNC_BUCKET || 'media',
  maxFileSize: 100 * 1024 * 1024, // 100MB max file size
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedVideoTypes: ['video/mp4', 'video/webm']
};

const mediaSyncService = new MediaSyncService(supabase, syncConfig);

const program = new Command();

program
  .name('sync-media')
  .description('Synchronize media files with Supabase storage')
  .option('-d, --dry-run', 'Show what would be uploaded without actually uploading', false)
  .action(async (options) => {
    try {
      const report = await mediaSyncService.syncDirectory(options.dryRun);
      
      if (options.dryRun) {
        console.log(`Found ${report.totalFiles} media files that need syncing`);
      } else {
        console.log(`Sync completed:
- Total files: ${report.totalFiles}
- Successfully uploaded: ${report.successfulUploads}
- Failed uploads: ${report.failedUploads}
${report.errors.length > 0 ? '\nErrors:\n' + report.errors.map(e => `- ${e.file}: ${e.error}`).join('\n') : ''}`);
      }
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

program.parse(); 