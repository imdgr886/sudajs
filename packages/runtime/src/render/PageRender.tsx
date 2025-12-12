// import { View } from "@tarojs/components";
import { SectionRenderer } from "./SectionRender";

export type PageJSON = {
  name: string;
  sections: Record<
    string,
    {
      type: string;
      settings?: Record<string, any>;
      blocks?: Record<string, any>;
    }
  >;
  order: string[];
};

export function PageRenderer({ page }: { page: PageJSON }) {
  return (
    <>
      {page.order.map((id) => {
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
