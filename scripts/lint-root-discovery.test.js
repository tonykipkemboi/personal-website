const assert = require('node:assert/strict')
const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = require('node:fs')
const { tmpdir } = require('node:os')
const path = require('node:path')
const { createRequire } = require('node:module')
const { test } = require('node:test')
const { ESLint } = require('eslint')

// Next's only fast-glob call uses globSync(pattern, { onlyDirectories: true }).
// Exercise that call through the real plugin, including the rule it supports.
test('Next lint still discovers globbed roots and rejects plain internal links', async () => {
  const fixture = mkdtempSync(path.join(tmpdir(), 'next-lint-roots-'))
  try {
    for (const name of ['web', 'admin']) {
      mkdirSync(path.join(fixture, name, 'app'), { recursive: true })
      writeFileSync(
        path.join(fixture, name, 'app/page.tsx'),
        'export default function Page() { return null }'
      )
    }
    const pluginRequire = createRequire(
      require.resolve('@next/eslint-plugin-next')
    )
    assert.equal(
      pluginRequire('fast-glob/package.json').name,
      '@tonykipkemboi/next-eslint-glob'
    )
    const { globSync } = pluginRequire('fast-glob')
    assert.deepEqual(
      globSync(path.join(fixture, 'web'), { onlyDirectories: true }),
      [path.join(fixture, 'web')]
    )
    const pattern = `${fixture}/{web,admin}`
    assert.deepEqual(globSync(pattern, { onlyDirectories: true }).sort(), [
      path.join(fixture, 'admin'),
      path.join(fixture, 'web'),
    ])
    for (const rootDir of [pattern, [`${fixture}/web`, `${fixture}/admin`]]) {
      const eslint = new ESLint({
        overrideConfig: [{ settings: { next: { rootDir } } }],
      })
      const [invalid] = await eslint.lintText(
        'export default function Page() { return <a href="/">Home</a> }',
        { filePath: 'app/lint-regression-fixture.tsx' }
      )
      assert(
        invalid.messages.some(
          (m) => m.ruleId === '@next/next/no-html-link-for-pages'
        )
      )
      const [valid] = await eslint.lintText(
        'import Link from "next/link"; export default function Page() { return <Link href="/">Home</Link> }',
        { filePath: 'app/lint-regression-fixture.tsx' }
      )
      assert.equal(valid.errorCount, 0, JSON.stringify(valid.messages))
    }
  } finally {
    rmSync(fixture, { recursive: true, force: true })
  }
})
