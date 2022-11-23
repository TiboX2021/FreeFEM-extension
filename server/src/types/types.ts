import types from "./types.json";
const types_map = new Map(Object.entries(types));

export function typeTooltip(keyword: string): [string] | undefined {
    const result = types_map.get(keyword);

    if (result === undefined) return undefined;

    return [result];
}
