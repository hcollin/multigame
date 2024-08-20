import { chance, rnd } from "rndlib";
import { Grid, Row, Cell, CELLTYPE, GRIDOBJECTYPE, GridObject } from "../models/Grid.model";
import { createGridObject } from "./gridObject";

export function createGrid(width: number, height: number): Grid {
    const grid = placeScoringTiles(addObjectsToGrid(addWaterToGrid(createEmptyGrid(width, height), [50, 2])));

    return grid;
}

function createEmptyGrid(width: number, height: number): Grid {
    const rows: Row[] = [];
    for (let row = 0; row < height; row++) {
        const cells: Cell[] = [];
        for (let col = 0; col < width; col++) {
            cells.push({ row, col, type: CELLTYPE.EMPTY, objects: [] });
        }
        rows.push({ row, cells });
    }
    return { size: [height, width], rows };
}

function addWaterToGrid(grid: Grid, waterOpts: [number, number]): Grid {
    const newGrid = { ...grid };
    for (let i = 3; i < grid.size[0]; i++) {
        // Add water to this row
        if (chance(waterOpts[0])) {
            const midCol = rnd(1, grid.size[1]) - 1;
            const size = rnd(1, waterOpts[1]);
            const startCol = Math.max(0, midCol - size);
            const endCol = Math.min(grid.size[1], midCol + size);
            for (let j = startCol; j < endCol; j++) {
                newGrid.rows[i].cells[j].type = CELLTYPE.WATER;
            }
        }
    }

    return newGrid;
}

function addObjectsToGrid(grid: Grid): Grid {
    // Add Troop Plus objects
    let trpCount = Math.round(grid.size[1] * grid.size[0] * 0.03);
    while (trpCount > 0) {
        const obj = createTroopPlusObject(grid);
        if (obj) {
            grid.rows[obj.row].cells[obj.col].objects.push(obj);
            trpCount--;
        }
    }

    // Add Troop Multi objects
    let trpMultiCount = Math.round(grid.size[1] * grid.size[0] * 0.02);
    while (trpMultiCount > 0) {
        const obj = createTroopMultiObject(grid);
        if (obj) {
            grid.rows[obj.row].cells[obj.col].objects.push(obj);
            trpMultiCount--;
        }
    }

    return grid;
}

function createTroopPlusObject(grid: Grid): GridObject | null {
    const row = rnd(1, grid.size[0] - 3);
    const col = rnd(0, grid.size[1] - 1);
    const cell = grid.rows[row].cells[col];

    const objectsOnSameRow = cell.objects.filter((o) => o.type === GRIDOBJECTYPE.TROOPPLUS && o.row === row);
    if (objectsOnSameRow.length > 0) return null;

    if (cell && cell.type === CELLTYPE.EMPTY) {
        const obj = createGridObject({
            col,
            row,
            type: GRIDOBJECTYPE.TROOPPLUS,
            value: rnd(1, 5) * 5,
        });
        return obj;
    }
    return null;
}

function createTroopMultiObject(grid: Grid): GridObject | null {
    const row = rnd(1, grid.size[0] - 3);
    const col = rnd(0, grid.size[1] - 1);
    const cell = grid.rows[row].cells[col];

    const objectsOnSameRow = cell.objects.filter((o) => o.type === GRIDOBJECTYPE.TROOPMULTI && o.row === row);
    if (objectsOnSameRow.length > 0) return null;

    if (cell && cell.type === CELLTYPE.EMPTY) {
        const obj = createGridObject({
            col,
            row,
            type: GRIDOBJECTYPE.TROOPMULTI,
            value: rnd(2, 5),
        });
        return obj;
    }
    return null;
}


function placeScoringTiles(grid: Grid): Grid {

    // Place a scoring tile replacing an empty tile every 20 rows starting from row 20
    for (let i = 20; i < grid.size[0]; i += 20) {
        const row = grid.rows[i];
        const emptyCells = row.cells.filter((c) => c.type === CELLTYPE.EMPTY && c.col > 0 && c.col < grid.size[1] - 1);
        if (emptyCells.length > 0) {
            const cell = emptyCells[rnd(0, emptyCells.length - 1)];
            cell.type = CELLTYPE.SCORE;
        }
    }

    return grid;
}