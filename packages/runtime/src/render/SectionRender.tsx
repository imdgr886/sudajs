import * as Sections from "@buildspace/sections";

export function SectionRenderer({
  id,
  type,
  settings,
  blocks,
}: {
  id: string;
  type: string;
  settings?: Record<string, any>;
  blocks?: Record<string, any>;
}) {
  const Component = (Sections as any)[type];
  if (!Component) {
    console.warn(`Section component not found: ${type}`);
    return null;
  }
  return <Component id={id} settings={settings ?? {}} blocks={blocks} />;
}
