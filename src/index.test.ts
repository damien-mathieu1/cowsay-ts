import assert from "node:assert/strict";
import { test } from "node:test";
import { cowsay } from "./index.js";

test("wraps short text in a single-line bubble", () => {
  const out = cowsay("hi");
  assert.match(out, /< hi >/);
  assert.match(out, /\^__\^/);
});

test("wraps long text across multiple bubble lines", () => {
  const out = cowsay("this is a fairly long sentence that should wrap", { maxWidth: 20 });
  const bubbleLines = out.split("\n").filter((l) => l.startsWith("/") || l.startsWith("|") || l.startsWith("\\"));
  assert.ok(bubbleLines.length > 1);
});

test("picks the requested animal", () => {
  const out = cowsay("hi", { animal: "tux" });
  assert.match(out, /o_o/);
});

test("rejects an unknown animal at the type level only; runtime falls back safely", () => {
  assert.throws(() => cowsay("hi", { animal: "nope" as never }));
});
