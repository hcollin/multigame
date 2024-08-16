

export interface Grid {
    size: [number, number]; // [rows, cols]
    rows: Row[];
}

export interface Row {
    row: number;
    cells: Cell[];
}

export interface Cell {
    row: number;
    col: number;
    type: CELLTYPE;
    objects: GridObject[];
}

export enum CELLTYPE {
    EMPTY = "empty",
    WALL = "wall",
    WATER = "water",
}



export enum GRIDOBJECTYPE {
    UNKNOWN = "unknown",
    TROOPPLUS = "troopplus",
    TROOPMULTI = "troopmulti",
}

export enum GRIDOBJECTSTATUS {
    ONGRID = "ongrid",
    PICKEDUP = "pickedup",
    LOCKED = "locked",
}

export interface GridObject {
    id: string;
    type: GRIDOBJECTYPE;
    col: number;
    row: number;
    status: GRIDOBJECTSTATUS;
    value: number|(() => number)|null;
}