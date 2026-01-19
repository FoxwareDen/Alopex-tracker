import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { cwd } from 'node:process'
import typescript from '@rollup/plugin-typescript'

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json'), 'utf8'))

export default {
  input: {
    index: 'src/index.ts',
    orms: 'src/orms/index.ts'
  },
  output: [
    {
      dir: dirname(pkg.exports['.'].import),
      format: 'esm',
      entryFileNames: '[name].js',
      preserveModules: false
    },
    // {
    //   dir: dirname(pkg.exports['.'].import),
    //   format: 'cjs',
    //   entryFileNames: '[name].cjs',
    //   preserveModules: false
    // }
  ],
  plugins: [
    typescript({
      declarationDir: dirname(pkg.exports['.'].import),
      declaration: true,
      emitDeclarationOnly: false
    })
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
}
//
// import { readFileSync } from 'node:fs'
// import { dirname, join } from 'node:path'
// import { cwd } from 'node:process'
// import typescript from '@rollup/plugin-typescript'
//
// const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json'), 'utf8'))
//
// export default {
//   input: { index: 'src/index.ts', orm: "src/orms.ts" },
//   plugins: [
//     typescript({
//       declaration: true,
//       declarationDir: dirname(pkg.exports.import)
//     })
//   ],
//   external: [
//     ...Object.keys(pkg.dependencies || {}),
//     ...Object.keys(pkg.peerDependencies || {})
//   ]
// }
