# Contributing

```bash
git clone https://github.com/damien-mathieu1/cowsay-ts
cd cowsay-ts
npm install
```

- `npm test` — run the test suite
- `npm run lint` — lint
- `npm run build` — build the ESM/CJS/CLI bundles

## Commits

Commits must follow [Conventional Commits](https://www.conventionalcommits.org)
(`feat:`, `fix:`, `chore:`, ...) — enforced by commitlint via a husky
`commit-msg` hook. A `pre-commit` hook runs lint, tests, and a critical-level
`npm audit`.

## Adding an animal

Add an ASCII art entry to `src/animals.ts`. Keep it reasonably sized (the
cow is the reference width) and add a test asserting a distinctive line of
its art renders.

## Releases

Releases are cut by maintainers via the **Release** GitHub Actions workflow
(CalVer `vYYYY.M.N`, changelog via git-cliff, published to npm). Contributors
don't need to do anything release-related.
