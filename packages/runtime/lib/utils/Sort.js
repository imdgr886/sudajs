"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderedItems = getOrderedItems;
const lodash_es_1 = require("lodash-es");
/**
 * 获取有序的 sections 或 blocks
 * @param obj - sections 或 blocks 对象
 * @param orderArr - order 或 block_order 数组，可选
 */
function getOrderedItems(obj, orderArr) {
    if (!obj)
        return {};
    if (!orderArr)
        orderArr = [];
    orderArr = (0, lodash_es_1.uniq)([...orderArr, ...Object.keys(obj)]);
    const result = {};
    orderArr === null || orderArr === void 0 ? void 0 : orderArr.forEach((key) => {
        if (obj[key])
            result[key] = obj[key];
    });
    return result;
}
//# sourceMappingURL=Sort.js.map