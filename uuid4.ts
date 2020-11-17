/*
 * Copyright 2020 Marek Kobida
 */

import crypto from 'crypto';

/**
 *  <https://tools.ietf.org/html/rfc4122>
 *  ```
 *  bytes[6]  0x10  (30) 0000 0001 1110
 *            0x0F  (15) 0000 0000 1111
 *                       0000 0000 1110 =  0xE  (14) AND
 *            0x40  (64) 0000 0100 0000
 *                       0000 0100 1110 = 0x4E  (78) OR
 *
 *  bytes[8]  0x10  (30) 0000 0001 1110
 *            0x3F  (63) 0000 0011 1111
 *                       0000 0001 1110 = 0x10  (30) AND
 *            0x80 (128) 0000 1000 0000
 *                       0000 1001 1110 = 0x9E (158) OR
 *  ```
 */
function uuid4(): string {
  const bytes: Uint8Array = crypto.randomFillSync(new Uint8Array(16));

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const $: string[] = [...bytes].map((byte: number): string => byte.toString(16).padStart(2, '0'));

  return [
    ...$.slice(0, 4),
    '-',
    ...$.slice(4, 6),
    '-',
    ...$.slice(6, 8),
    '-',
    ...$.slice(8, 10),
    '-',
    ...$.slice(10, 16),
  ].join('');
}

export default uuid4;
