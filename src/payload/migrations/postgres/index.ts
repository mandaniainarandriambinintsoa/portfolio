import * as migration_20260723_205557_cms_services_site_content from './20260723_205557_cms_services_site_content.ts';

export const migrations = [
  {
    up: migration_20260723_205557_cms_services_site_content.up,
    down: migration_20260723_205557_cms_services_site_content.down,
    name: '20260723_205557_cms_services_site_content'
  },
];
