"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRenderer = PageRenderer;
const jsx_runtime_1 = require("react/jsx-runtime");
// import { View } from "@tarojs/components";
const SectionRender_1 = require("./SectionRender");
function PageRenderer({ page }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: page.order.map((id) => {
            const sec = page.sections[id];
            if (!sec)
                return null;
            return ((0, jsx_runtime_1.jsx)(SectionRender_1.SectionRenderer, { id: id, type: sec.type, settings: (sec === null || sec === void 0 ? void 0 : sec.settings) || {}, blocks: (sec === null || sec === void 0 ? void 0 : sec.blocks) || [] }, id));
        }) }));
}
//# sourceMappingURL=PageRender.js.map