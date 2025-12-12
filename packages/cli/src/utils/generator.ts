import fs from 'fs'
import { toCamelCase, capitalize } from '@tarojs/shared'
import path from 'path'

export function generatePageFiles(pagesDir: string, WORKSPACE: string) {
  const pageFiles = fs
    .readdirSync(pagesDir)
    .filter(f => f.endsWith('.json') || f.endsWith('.jsx') || f.endsWith('.tsx'))

  const pages: string[] = []
  pageFiles.forEach(async file => {
    const pagePath = path.join(pagesDir, file)

    const ext = path.parse(file).ext.toLowerCase()
    const pageName = path.parse(file).name

    if (ext == '.jsx' || ext == '.tsx') {
      fs.copyFileSync(pagePath, path.join(WORKSPACE, `src/pages/${pageName}/index${ext}`))
    }

    const pageJson = JSON.parse(fs.readFileSync(pagePath, 'utf-8'))

    const code = `
import { PageRender } from '@sudajs/runtime'

export default function Page = () => {
    return <PageRender page={${JSON.stringify(pageJson)}} />
}

`
    // 递归创建目录
    fs.mkdirSync(path.join(WORKSPACE, `src/pages/${pageName}`), { recursive: true })
    // 写入文件
    fs.writeFileSync(path.join(WORKSPACE, `src/pages/${pageName}/index.tsx`), code, { flag: 'w' })
    pages.push(`pages/${pageName}/index`)
    console.log(`✅ [${pageName}] page generated successfully`)
  })

  // TODO: generage src/app.config.ts
}

export function generateIndexFile(themePath: string, folder: string = 'sections', WORKSPACE: string) {
  const componentsDir = path.join(themePath, folder)
  if (!fs.existsSync(componentsDir)) {
    return
  }
  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'))
  // 生成 import 语句
  const importStatements = new Set<string>()
  const components = new Map<string, string>()

  files.forEach(file => {
    const type = path.parse(file).name
    const componentName = capitalize(toCamelCase(type))

    importStatements.add(`import ${componentName} from '@theme/${folder}/${type}';`)
    components.set(type, componentName)
  })

  const exportObject = new Array()
  components.forEach((componentName, type) => {
    exportObject.push(`"${type}": ${componentName}`)
  })

  const code = `
  ${Array.from(importStatements).join('\n')}
  
  export default {
    ${exportObject.join(',')}
  }
  `

  fs.writeFileSync(path.join(WORKSPACE, `src/${folder}.ts`), code, { flag: 'w' })
}
