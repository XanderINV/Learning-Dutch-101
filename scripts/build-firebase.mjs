import { spawnSync } from 'node:child_process'

process.env.VITE_BASE_PATH = '/'

const result = spawnSync('npx', ['tsc', '-b', '&&', 'vite', 'build'], {
  stdio: 'inherit',
  env: process.env,
  shell: true,
})

process.exit(result.status ?? 1)
