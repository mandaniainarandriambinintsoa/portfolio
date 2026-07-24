import * as migration_20260723_205557_cms_services_site_content from './20260723_205557_cms_services_site_content.ts';
import * as migration_20260724_181455_add_pages_blocks from './20260724_181455_add_pages_blocks.ts';

export const migrations = [
  {
    up: migration_20260723_205557_cms_services_site_content.up,
    down: migration_20260723_205557_cms_services_site_content.down,
    name: '20260723_205557_cms_services_site_content',
  },
  {
    up: migration_20260724_181455_add_pages_blocks.up,
    down: migration_20260724_181455_add_pages_blocks.down,
    name: '20260724_181455_add_pages_blocks'
  },
];
