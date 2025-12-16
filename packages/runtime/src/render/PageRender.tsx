import { SectionRenderer } from "./SectionRender";

export type PageJson = {
  name: string;
  sections: Record<string, any>;
  order?: string[];
};

export function PageRenderer({ page }: { page: PageJson }) {
  return (
    <>
      {(page?.order || []).map((id) => {
        const sec = page.sections[id];
        if (!sec) return null;
        return (
          <SectionRenderer
            key={id}
            id={id}
            type={sec.type}
            settings={sec?.settings || {}}
            blocks={sec?.blocks || []}
          />
        );
      })}
    </>
  );
}
