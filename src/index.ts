import { animals, type Animal } from "./animals.js";

export type { Animal } from "./animals.js";
export { animals } from "./animals.js";

export type CowsayOptions = {
  /** Which ASCII animal says the line. Defaults to "cow". */
  animal?: Animal;
  /** Max bubble width before wrapping, in characters. Defaults to 40. */
  maxWidth?: number;
};

function wrap(text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  return lines.length > 0 ? lines : [""];
}

function bubble(text: string, maxWidth: number): string {
  const lines = wrap(text, maxWidth);
  const width = Math.max(...lines.map((l) => l.length));

  const top = ` ${"_".repeat(width + 2)}`;
  const bottom = ` ${"-".repeat(width + 2)}`;

  const body = lines
    .map((line, i) => {
      const padded = line.padEnd(width, " ");
      if (lines.length === 1) return `< ${padded} >`;
      if (i === 0) return `/ ${padded} \\`;
      if (i === lines.length - 1) return `\\ ${padded} /`;
      return `| ${padded} |`;
    })
    .join("\n");

  return `${top}\n${body}\n${bottom}`;
}

/** Render `text` in an ASCII speech bubble, said by the chosen animal. */
export function cowsay(text: string, options: CowsayOptions = {}): string {
  const { animal = "cow", maxWidth = 40 } = options;
  if (!(animal in animals)) {
    throw new Error(
      `Unknown animal "${animal}". Available: ${Object.keys(animals).join(", ")}`
    );
  }
  return `${bubble(text, maxWidth)}\n${animals[animal]}`;
}
