export interface BaseSettingSchema {
  id: string;
  label: string;
  info?: string;
  default?: unknown;
}

export interface RangeSettingSchema extends BaseSettingSchema {
  type: "range";
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export interface SelectSettingSchema extends BaseSettingSchema {
  type: "select";
  options: {
    value: string;
    label: string;
  }[];
}

export interface CheckboxSettingSchema extends BaseSettingSchema {
  type: "checkbox";
}

export interface TextSettingSchema extends BaseSettingSchema {
  type: "text";
  placeholder?: string;
}

export interface ImageSettingSchema extends BaseSettingSchema {
  type: "image";
  aspectRatio?: number;
}

export interface NavigationSettingSchema extends BaseSettingSchema {
  type: "navigation";
  //target: "_blank" | "_self";
}

export type SettingSchema =
  | RangeSettingSchema
  | SelectSettingSchema
  | CheckboxSettingSchema
  | TextSettingSchema
  | ImageSettingSchema
  | NavigationSettingSchema;
