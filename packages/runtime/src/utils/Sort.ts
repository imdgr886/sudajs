import { uniq } from "lodash-es";
/**
 * 获取有序的 sections 或 blocks
 * @param obj - sections 或 blocks 对象
 * @param orderArr - order 或 block_order 数组，可选
 */
export function getOrderedItems<T>(
  obj: Record<string, T>,
  orderArr?: string[],
): Record<string, T> {
  if (!obj) return {};
  if (!orderArr) orderArr = [];

  orderArr = uniq([...orderArr, ...Object.keys(obj)]);

  const result: Record<string, T> = {};

  orderArr?.forEach((key) => {
    if (obj[key]) result[key] = obj[key];
  });

  return result;
}
