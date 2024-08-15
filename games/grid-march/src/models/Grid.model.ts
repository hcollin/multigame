

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
}

export enum CELLTYPE {
    EMPTY = "empty",
    WALL = "wall",
    WATER = "water",
}