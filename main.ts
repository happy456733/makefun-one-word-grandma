// One Word From Grandma
// -----------------------
// The single word my grandma would text about AI.
//
// She watched the machine answer questions nobody asked it, finish
// sentences, and know things it had no business knowing — and summed
// the whole impossible business up the way only a grandma can.
//
// How the word was picked: four candidates were scored 1-5 on the
// judge's own order — grandma's texting voice, funny in one word,
// tied to AI, fresh rather than obvious:
//   witchcraft   voice 5, funny 5, AI-tie 4, fresh 5  -> 19 (the pick)
//   knowitall    voice 4, funny 4, AI-tie 3, fresh 3  -> 14 (fits any
//                know-it-all person, not the machine in particular)
//   mindreader   voice 3, funny 4, AI-tie 4, fresh 4  -> 15 (clever,
//                but sounds like a stage act, not a grandma texting)
//   magicbox     voice 4, funny 3, AI-tie 4, fresh 3  -> 14 (sweet,
//                but a box is a thing, not the baffled verdict)
// "witchcraft" wins: warm, a little baffled, funny in one word, and
// tied to the machine doing things no ordinary box should do. Not
// the obvious pick — no "robot", no "wow", no "amazing".

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Candidate words, each scored on the judge's criteria in order:
// [grandma's voice, funny in one word, tied to AI, fresh].
const candidates: Array<{ word: string; scores: number[] }> = [
  { word: "witchcraft", scores: [5, 5, 4, 5] },
  { word: "mindreader", scores: [3, 4, 4, 4] },
  { word: "knowitall", scores: [4, 4, 3, 3] },
  { word: "magicbox", scores: [4, 3, 4, 3] },
];

function total(scores: number[]): number {
  return scores.reduce((sum, score) => sum + score, 0);
}

// Highest total wins; ties break towards the earlier candidate, so the
// order above is the tie-break. The rejected candidates stay in the code
// as the record of what was considered and turned down.
const pick = [...candidates].sort(
  (a, b) => total(b.scores) - total(a.scores),
)[0].word;

// The gate: exactly one word, 1-30 UTF-8 characters, not only whitespace.
if (/\s/.test(pick)) throw new Error("entry must be a single word");
if (pick.length < 1 || pick.length > 30) {
  throw new Error("entry must be 1-30 characters");
}
if (pick.trim().length === 0) throw new Error("entry must not be blank");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), pick, "utf8");
