import { GridObject, GRIDOBJECTSTATUS, GRIDOBJECTYPE } from "../models/Grid.model";

let gridObjectCounter = 1;

export function createGridObject(opts: Partial<GridObject>): GridObject {
    return {
        id: opts.id || `gridObject-${gridObjectCounter++}`,
        col: opts.col || 0,
        row: opts.row || 0,
        type: opts.type || GRIDOBJECTYPE.UNKNOWN,
        status: opts.status || GRIDOBJECTSTATUS.ONGRID,
        value: opts.value || null,
    };
}

export function gridObjectValue(go: GridObject): number {
    if(go.value === null) return 0;
    if(typeof go.value === "number") return go.value;
    return go.value();
}