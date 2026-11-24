// funniest-toaster-error-20261124 — make.fun entry: "The Funniest Toaster Error Message".
//
// The program writes a single line to $MAKEFUN_OUTPUT_DIR/entry.txt: the error
// message a kitchen toaster shows its owner when its crumb tray is full.
// The joke is deadpan appliance resentment: a mundane maintenance fault turns
// into a quiet complaint about six months of unemptied crumbs.
//
// The line is one sentence, 74 characters, well inside the bounty cap of 120.
// It is written exactly as-is, with no trailing newline, so the sealed gate
// sees a 1-120 character UTF-8 text and nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The toaster's own words — authored for this entry, 74 characters.
const LINE =
  "Error: crumb tray full; I have been carrying your mistakes for six months.";

// The bounty allows at most 120 characters; the gate rejects anything
// outside 1-120, or a line that is only whitespace, so refuse to write
// a line that would fail it.
if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`line must be 1-120 non-blank characters, got ${LINE.length}`);
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}

// The grader mounts the output folder, so only create it if missing and
// never remove it or anything inside it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
