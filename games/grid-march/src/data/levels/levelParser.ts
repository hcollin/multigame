import { v4 } from "uuid";
import { Cell, CELLTYPE, Grid, GridObject, GRIDOBJECTSTATUS, GRIDOBJECTYPE, Row } from "../../models/Grid.model";



export function levelParser(levelString: string): Grid {
       
    const [header, levelrows] = levelString.split("LEVELDATA:", 2);
    
    // console.log("HEADER:", header, "\nLEVELROWS:", levelrows);

    const [headerArgString, name, description] = header.split("\r\n", 3);
    console.log(headerArgString, "\n", name, "\n", description);

    const headerArgs = headerArgString.split(" ");

    const levelNo = parseInt(headerArgs[0]);
    const gridHeight = parseInt(headerArgs[1]);
    const gridWidth = parseInt(headerArgs[2]);

    const rows = levelrows.split("\r\n");
    
    const grid: Grid = {
        size: [gridHeight, gridWidth],
        rows: []
    };
    
    let r = 0;
    rows.forEach((row, i) => {  
        const cells = row.trim().split(" ");
        
        // Skip rows that do not have the correct number of cells 
        if(cells.length === gridWidth) {
            const row: Row = {
                row: r,
                cells: []
            };

            cells.forEach((c, j) => {

                const fChar = c.charAt(0);

                const cell: Cell = {
                    row: r,
                    col: j,
                    type: levelCodeToCellType(fChar),
                    objects: []
                }

                if(c.length > 1) {
                    const objCode = c.substring(1);

                    const obj = objectCode(objCode, j, r);
                    if(obj !== null) {
                        cell.objects.push(obj);
                    }
                }

                row.cells.push(cell);
            });

            r++;

            grid.rows.push(row);
        } else {
            const len = cells.length;
            if(len > 1) console.warn(`Level ${levelNo} row ${i} has ${len} cells, expected ${gridWidth}`);
        }


    });

    if(r !== gridHeight) {
        throw new Error(`Level ${levelNo} has ${r} rows, expected ${gridHeight}`);   
    }

    return grid;
}


function levelCodeToCellType(code: string): CELLTYPE {
    switch(code) {
        case "E": return CELLTYPE.EMPTY;
        case "W": return CELLTYPE.WATER;
        case "S": return CELLTYPE.SCORE;
        default: return CELLTYPE.EMPTY;
    }
}


function objectCode(code: string, col: number, row: number): GridObject|null {
    const chars = code.split("");

    // TROOP MULTIPLIER OBJECT
    if(chars[0] === "x") {
        const obj: GridObject = {
            id: v4(),
            type: GRIDOBJECTYPE.TROOPMULTI,
            col,
            row,
            status: GRIDOBJECTSTATUS.ONGRID,
            value: parseInt(chars[1])
        }
        return obj;
    }

    // TROOP PLUS OBJECT
    if(chars[0] === "+") {
        const obj: GridObject = {
            id: v4(),
            type: GRIDOBJECTYPE.TROOPPLUS,
            col,
            row,
            status: GRIDOBJECTSTATUS.ONGRID,
            value: parseInt(code.substring(1))
        }
        return obj;
    }



    return null;
}
