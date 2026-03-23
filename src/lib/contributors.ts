import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { PostMetadata } from '@/lib/content/markdown';

interface Contributor {
  id: string;
  type: 'human' | 'ai';
  name: string;
  title?: string;
  url?: string;
}

interface ContributorsFile {
  contributors: Contributor[];
}

let cache: Map<string, Contributor> | null = null;

async function loadContributorsMap(): Promise<Map<string, Contributor>> {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), 'docs', 'contributors.yaml');
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = (yaml.load(raw) as ContributorsFile) || { contributors: [] };
  cache = new Map((parsed.contributors || []).map(c => [c.id, c]));
  return cache;
}

export async function applyContributorMetadata(metadata: PostMetadata): Promise<PostMetadata> {
  const map = await loadContributorsMap();

  const authorId = metadata.author_id || 'ian_derrington';
  const authorEntry = map.get(authorId);

  const aiIds = metadata.ai_author_ids && metadata.ai_author_ids.length > 0
    ? metadata.ai_author_ids
    : ['codex_5_3', 'opus_4_6', 'sonnet_4_6'];

  const aiAuthors = aiIds
    .map(id => map.get(id))
    .filter((c): c is Contributor => !!c)
    .map(c => ({ name: c.name, role: c.title || 'AI Co-Author' }));

  return {
    ...metadata,
    author: authorEntry
      ? { name: authorEntry.name, title: authorEntry.title }
      : metadata.author,
    authorUrl: authorEntry?.url || metadata.authorUrl || 'https://ian.ceo',
    ai_authors: aiAuthors.length > 0 ? aiAuthors : metadata.ai_authors,
  };
}
