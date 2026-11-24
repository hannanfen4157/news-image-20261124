// news-image-20261124 entry (Node 22, standard library only).
// The image is the entry.png beside this file: a front page summing up the
// world news of Tuesday 24 November 2026. The program copies it to the
// output directory the grader provides, so both runs write identical bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const source = new URL('./entry.png', import.meta.url);
if (!existsSync(source)) {
  throw new Error('entry.png is missing from the repository');
}
const target = join(outDir, 'entry.png');
copyFileSync(source, target);
// The grader runs this program twice and requires identical bytes both
// times, so confirm the copy landed whole before exiting.
if (statSync(target).size !== statSync(source).size) {
  throw new Error('entry.png copy is incomplete');
}
