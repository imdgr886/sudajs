"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionRenderer = SectionRenderer;
const jsx_runtime_1 = require("react/jsx-runtime");
const Sections = require("@buildspace/sections");
function SectionRenderer({ id, type, settings, blocks, }) {
    const Component = Sections[type];
    if (!Component) {
        console.warn(`Section component not found: ${type}`);
        return null;
    }
    return (0, jsx_runtime_1.jsx)(Component, { id: id, settings: settings !== null && settings !== void 0 ? settings : {}, blocks: blocks });
}
//# sourceMappingURL=SectionRender.js.map