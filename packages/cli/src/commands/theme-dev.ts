import { Command } from 'commander'
import path from 'path'
import fsExtra from 'fs-extra'
import chokidar from 'chokidar'
import { spawn } from 'child_process'
import { generateIndexFile, generatePageFiles } from '../utils/generator'

// 支持的 type 类型
const SUPPORTED_TYPES = ['webapp', 'swan', 'alipay', 'tt', 'h5', 'rn', 'qq', 'jd', 'quickapp'] as const
export type DevType = (typeof SUPPORTED_TYPES)[number]

export function registerPreview(themeCommand: Command) {
  themeCommand
    .command('dev')
    .option('-t, --type', `Specify the platform type (${SUPPORTED_TYPES.join(', ')})`, 'h5')
    .description('Preview a theme for deveopment')
    .action((options: { type?: string }) => {
      const type = options.type as DevType

      if (!SUPPORTED_TYPES.includes(type as DevType)) {
        console.error(`Invalid type: ${type}. Must be one of: ${SUPPORTED_TYPES.join(', ')}`)
        process.exit(1)
      }

      themePreview(type)
    })
}

const themePreview = async (type: string) => {
  console.log('🔧 Start preview mode...')

  const THEME_DIR = process.cwd()
  const WORKSPACE = path.join(THEME_DIR, '.build')

  fsExtra.emptyDirSync(WORKSPACE)
  fsExtra.copySync(path.join(__dirname, '../../stubs/build'), WORKSPACE)

  console.log('Installing dependencies...')
  await runPnpmInstall(WORKSPACE)

  console.log('Dependencies installed, starting theme preview...')

  // 1. Build preview page on start
  generateIndexFile(THEME_DIR, 'sections', WORKSPACE)
  generateIndexFile(THEME_DIR, 'blocks', WORKSPACE)
  generatePages(THEME_DIR, WORKSPACE)

  // 2. Watch theme files
  chokidar.watch([`${THEME_DIR}/**/*`]).on('all', async (_, file) => {
    console.log(`📁 File Changed → ${file}`)
    generateIndexFile(THEME_DIR, 'sections', WORKSPACE)
    generateIndexFile(THEME_DIR, 'blocks', WORKSPACE)
    generatePages(THEME_DIR, WORKSPACE)
  })

  // 3. Start Taro dev server
  // taro build --type h5
  runPreview(WORKSPACE, type)
}

export default registerPreview

// Build preview page on start
function generatePages(themeRoot: string, workspace: string) {
  const THEME_DIR = themeRoot
  const WORKSPACE = workspace
  const pagesDir = path.join(THEME_DIR, 'pages')
  generatePageFiles(pagesDir, WORKSPACE)
  console.log('✨ Generated preview pages')
}

async function runPnpmInstall(rootDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['install'], {
      cwd: rootDir, // run in target project directory
      stdio: 'inherit', // pipe output to console
      shell: true // ensures cross-platform compatibility
    })

    child.on('close', code => {
      if (code === 0) resolve()
      else reject(new Error(`pnpm install exited with code ${code}`))
    })
  })
}

function runPreview(cwd: string, type: string = 'h5') {
  const proc = spawn('pnpm', ['run', `dev:${type}`], {
    cwd,
    stdio: 'inherit',
    shell: true
  })
  proc.on('exit', () => console.log('❌ Dev server exited.'))
}
