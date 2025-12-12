export interface BlockSchema {
  name: string
  type: string
  settings: Record<string, any>
}

export type ScalarType = 'string' | 'number' | 'boolean' | 'string[]' | 'number[]'

export interface EditorType {
  type: string
  returnType: ScalarType
}

export interface SectionSettingItemSchema {
  id: string
  label: string
  type: EditorType // 这里是指editor 中的 type，如 timepicker、datepicker
}

export interface SectionSchema {
  name: string
  settings: SectionSettingItemSchema[]
  blocks: Record<string, BlockSchema>
  class?: string[]
  block_order: string[]
}

export interface PageSchema {
  name: string
  layout?: string
  sections: Record<string, SectionSchema>
  settings: Record<string, any>
  order: string[]
  class?: string[]
}

type ReturnTypeMap = {
  string: string
  number: number
  boolean: boolean
  'string[]': string[]
  'number[]': number[]
}

export type ExtractSectionSettings<T extends SectionSchema> = {
  [Item in T['settings'][number] as Item['id']]: Item['type']['returnType'] extends keyof ReturnTypeMap
    ? ReturnTypeMap[Item['type']['returnType']]
    : unknown
}

const Datepicker: EditorType = {
  type: 'datepicker',
  returnType: 'string'
}

export const xxsectionSchema: SectionSchema = {
  name: 'test',
  settings: [
    {
      id: 'test',
      type: Datepicker,
      label: 'abc'
    }
  ],
  blocks: {},
  block_order: []
}
