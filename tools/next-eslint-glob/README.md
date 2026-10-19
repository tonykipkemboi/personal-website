# Next ESLint glob adapter

The Next ESLint plugin uses `fast-glob` only in `get-root-dirs`, through
`globSync(pattern, { onlyDirectories: true })`. Its dependency chain installs
`braces@3.0.3`, affected by GHSA-vfj7-8cjw-p6xm with no patched release.

The package override replaces only that plugin's dependency with this adapter
and maintained `tinyglobby@0.2.17`. It preserves literal directory roots,
absolute/relative output, and nonrecursive directory-pattern expansion. It does
not disable or replace any lint rules. Unsupported API calls fail explicitly.
The file override is relative to the scoped plugin's package directory; the
lockfile resolves it to `tools/next-eslint-glob`. `.npmrc` installs a copy so
clean CI installs do not depend on a nested symlink.

`npm run test:lint-globs` checks brace-pattern and array root discovery through
the actual Next plugin, including rejection of plain internal anchors and
acceptance of `next/link`. CI runs the same regression test. The normal full
`npm audit --audit-level=low` gate is unchanged.

Revisit this override when upstream Next removes the vulnerable dependency.
Before upgrading the plugin, check its glob API usage and rerun the regression
test. Do not expand this adapter into a general fast-glob replacement.
