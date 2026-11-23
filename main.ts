// One Word From Grandma
// -----------------------
// The single word my grandma would text about AI.
//
// She watched the machine answer questions nobody asked it, finish
// sentences, and know things it had no business knowing — and summed
// the whole impossible business up the way only a grandma can:
//
//   "witchcraft"
//
// Warm, a little baffled, funny in one word, and tied to the machine
// doing things no ordinary box should do. Not the obvious pick.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const word = "witchcraft";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), word, "utf8");
