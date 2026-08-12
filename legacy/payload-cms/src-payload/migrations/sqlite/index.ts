import * as migration_20260723_171556_init_payload from './20260723_171556_init_payload.ts';

export const migrations = [
  {
    up: migration_20260723_171556_init_payload.up,
    down: migration_20260723_171556_init_payload.down,
    name: '20260723_171556_init_payload'
  },
];
