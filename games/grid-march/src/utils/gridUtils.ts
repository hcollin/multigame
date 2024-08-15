import { chance, rnd } from "rndlib";
import { Grid, Row, Cell, CELLTYPE } from "../models/Grid.model";

export function createGrid(width: number, height: number): Grid {
    const grid = addWaterToGrid(createEmptyGrid(width, height), [50, 2]);

    return grid;
}

function createEmptyGrid(width: number, height: number): Grid {
    const rows: Row[] = [];
    for (let row = 0; row < height; row++) {
        const cells: Cell[] = [];
        for (let col = 0; col < width; col++) {
            cells.push({ row, col, type: CELLTYPE.EMPTY });
        }
        rows.push({ row, cells });
    }
    return { size: [height, width], rows };
}

function addWaterToGrid(grid: Grid, waterOpts: [number, number]): Grid {
    const newGrid = { ...grid };
    for(let i = 3; i < grid.size[0]; i++) {
        
        // Add water to this row
        if(chance(waterOpts[0]) ) {
            const midCol = rnd(1, grid.size[1]) - 1;
            const size = rnd(1, waterOpts[1]);
            const startCol = Math.max(0, midCol - size);
            const endCol = Math.min(grid.size[1], midCol + size);
            for(let j = startCol; j < endCol; j++) {
                newGrid.rows[i].cells[j].type = CELLTYPE.WATER;
            }
        }
    }


    return newGrid;
}
