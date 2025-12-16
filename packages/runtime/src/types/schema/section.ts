import { SettingSchema } from "./settings";

export interface BlockShema {
  type: string;
  name: string;
  limit?: number;
  settings?: SettingSchema[];
}
export interface SectionSchema {
  name: string;
  class?: string[];
  settings?: SettingSchema[];
  blocks?: BlockShema[];
}

type SettingValueMap = {
  text: string;
  image: string; // 或 Asset
  checkbox: boolean;
  select: string;
  range: number;
  navigation: {
    type: "internal" | "external";
    value: string;
  };
};

type SettingValue<S> = S extends { type: infer T }
  ? T extends keyof SettingValueMap
    ? SettingValueMap[T]
    : never
  : never;

export type SettingsArrayToObject<
  T extends readonly { id: string }[] | undefined,
> = T extends readonly { id: string }[]
  ? { [K in T[number] as K["id"]]?: SettingValue<K> }
  : {};

type BlockInstance<B> = B extends {
  type: infer T;
  settings?: readonly { id: string }[] | undefined;
}
  ? {
      type: T;
      settings: SettingsArrayToObject<B["settings"]>;
    }
  : never;

export type SectionProps<
  S extends {
    settings?: readonly any[];
    blocks?: readonly any[];
  },
> = {
  settings: SettingsArrayToObject<S["settings"]>;
  blocks: S["blocks"] extends readonly (infer B)[]
    ? Record<string, BlockInstance<B>>
    : {};
};

export function defineSection<const S extends SectionSchema>(schema: S): S {
  return schema;
}
