import { cowsay, animals, type Animal } from "./index.js";

function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data.trim()));
  });
}

async function main() {
  const args = process.argv.slice(2);
  const animalFlagIndex = args.findIndex((a) => a === "-f" || a === "--animal");
  let animal: Animal = "cow";

  if (animalFlagIndex !== -1) {
    const value = args[animalFlagIndex + 1];
    if (value && value in animals) {
      animal = value as Animal;
    } else {
      console.error(
        `Unknown animal "${value}". Available: ${Object.keys(animals).join(", ")}`
      );
      process.exit(1);
    }
    args.splice(animalFlagIndex, 2);
  }

  const text = args.length > 0 ? args.join(" ") : await readStdin();
  console.log(cowsay(text || "...", { animal }));
}

main();
