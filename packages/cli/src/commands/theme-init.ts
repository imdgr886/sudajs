import path from 'path'
import fs from 'fs-extra'
import { Command } from 'commander'
import inquirer from 'inquirer'

async function themeInit() {
  const cwd = process.cwd()

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'themeName',
      message: 'Enter theme name:',
      validate: input => (input ? true : 'Theme name cannot be empty'),
      default: 'my-theme'
    }
  ])
  const themeName = answers.themeName

  const themePath = path.join(cwd, themeName)

  if (fs.existsSync(themePath)) {
    console.error(`Directory ${themeName} already exists.`)
    process.exit(1)
  }

  console.log(`🔨 Creating theme starter kit at ${themePath} ...`)

  const dest = path.join(cwd, themeName)
  const src = path.join(__dirname, '../../stubs/theme')

  fs.copySync(src, dest)

  const pkg = require(path.resolve(__dirname, '../../package.json'))
  const packageJson = {
    name: themeName,
    description: 'Sudajs Skeleton Theme',
    private: true,
    version: '0.0.1',
    scripts: {
      dev: 'sudajs theme dev',
      build: 'sudajs theme build'
    },
    dependencies: {
      '@sudajs/runtime': pkg.peerDependencies['@sudajs/runtime'],
      '@babel/runtime': '^7.21.5',
      '@tarojs/components': '4.1.8',
      '@tarojs/helper': '4.1.8',
      '@tarojs/plugin-platform-weapp': '4.1.8',
      '@tarojs/plugin-platform-alipay': '4.1.8',
      '@tarojs/plugin-platform-tt': '4.1.8',
      '@tarojs/plugin-platform-swan': '4.1.8',
      '@tarojs/plugin-platform-jd': '4.1.8',
      '@tarojs/plugin-platform-qq': '4.1.8',
      '@tarojs/plugin-platform-h5': '4.1.8',
      '@tarojs/plugin-html': '4.1.8',
      '@tarojs/runtime': '4.1.8',
      '@tarojs/shared': '4.1.8',
      '@tarojs/taro': '4.1.8',
      '@nutui/nutui-react-taro': '^2.6.14',
      '@tarojs/plugin-framework-react': '4.1.8',
      '@tarojs/react': '4.1.8',
      'react-dom': '^18.0.0',
      react: '^18.0.0'
    },
    devDependencies: {
      '@babel/preset-react': '^7.24.1',
      '@babel/plugin-proposal-class-properties': '7.14.5',
      '@babel/core': '^7.8.0',
      'babel-plugin-import': '^1.13.8',
      '@tarojs/cli': '4.1.8',
      '@tarojs/vite-runner': '4.1.8',
      'babel-preset-taro': '4.1.8',
      'eslint-config-taro': '4.1.8',
      eslint: '^8.12.0',
      stylelint: '^14.4.0',
      terser: '^5.16.8',
      vite: '^4.2.0',
      'vite-plugin-imp': '^2.4.0',
      '@tarojs/test-utils-react': '^0.1.1',
      '@types/react': '^18.0.0',
      '@vitejs/plugin-react': '^4.1.0',
      'eslint-plugin-react': '^7.8.2',
      'eslint-plugin-import': '^2.12.0',
      'eslint-plugin-react-hooks': '^4.2.0',
      'react-refresh': '^0.11.0',
      sass: '^1.60.0',
      '@typescript-eslint/parser': '^6.2.0',
      '@typescript-eslint/eslint-plugin': '^6.2.0',
      typescript: '^5.1.0',
      postcss: '^8.4.18'
    }
  }

  await fs.writeJson(path.join(themePath, 'package.json'), packageJson, { spaces: 2 })

  // theme.config.json
  const themeConfig = {
    name: themeName,
    author: '',
    description: '',
    version: '0.1.0'
  }
  await fs.writeJson(path.join(themePath, 'theme.json'), themeConfig, { spaces: 2 })

  console.log(`🚀 Theme starter kit "${themeName}" created successfully!`)
  console.log(`Next steps:`)
  console.log(`  cd ${themeName}`)
  console.log(`  npm install`)
  console.log(`  npm run dev`)
}

export function registerThemeInit(themeCommand: Command) {
  themeCommand.command('init').description('Init a new theme starter kit').action(themeInit)
}

export default registerThemeInit
