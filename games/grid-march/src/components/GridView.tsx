import { useSnapshot } from "valtio";
import { GameStore, gameStore } from "../stores/GameStore";
import { Cell, Row, GridObject, GRIDOBJECTYPE } from "../models/Grid.model";
import { Troop, TROOPSTATUS } from "../models/Troops.model";
import TroopCell from "./TroopCell";

import "./grid-view.css";
import { gridObjectValue } from "../utils/gridObject";

const GridView = () => {
    const snap = useSnapshot(gameStore) as GameStore;

    const visibility = 10;

    const finalRow = Math.min(snap.row + visibility, snap.grid.size[0]);

    const rows = snap.grid.rows.filter((r) => r.row >= snap.row && r.row < finalRow).reverse();
    const emptyRowCount = visibility - rows.length;

    const emptyRows = new Array(emptyRowCount).fill("jee");

    return (
        <div className="grid-view">
            {emptyRows.map((_, i) => (
                <GridEmptyRow key={`empty-row-${i}`} />
            ))}
            {rows.map((r) => (
                <GridRow row={r} troops={snap.troops} gameRow={snap.row} key={`grid-row-${r.row}`} />
            ))}
        </div>
    );
};

const GridRow = (props: { row: Row; troops: Troop[]; gameRow: number }) => {
    const cells = props.row.cells;

    return (
        <div className="grid-row">
            <div className="row-index">{props.row.row}</div>
            {cells.map((c) => {
                let troop = null;
                if (props.row.row === props.gameRow) {
                    troop = props.troops.find((t) => t.col === c.col) || null;
                    if (troop && troop.status === TROOPSTATUS.DEAD) {
                        troop = null;
                    }
                }

                return <GridCell cell={c} troop={troop} key={`grid-cell-${c.row}-${c.col}`} />;
            })}
        </div>
    );
};

const GridCell = (props: { cell: Cell; troop: Troop | null }) => {
    return (
        <div className={`grid-cell ${props.cell.type}`}>
            
            {props.cell.objects.map((o, i) => (
                <CellObject key={`go-${props.cell.row}-${props.cell.col}-${i}`} object={o} />
            ))}
            {/* {props.troop === null && (
                <span className="coords">
                    {props.cell.row}, {props.cell.col}
                </span>
            )} */}
            {props.troop !== null && <TroopCell troop={props.troop} />}
        </div>
    );
};

const GridEmptyRow = () => {
    return <div className="grid-row empty"></div>;
};

const CellObject = (props: { object: GridObject }) => {
    
    if(props.object.type === GRIDOBJECTYPE.TROOPPLUS) {
        return <CellObjectTroopPlus object={props.object} />;
    }
    if(props.object.type === GRIDOBJECTYPE.TROOPMULTI) {
        return <CellObjectTroopMulti object={props.object} />;
    }
    const classes = ["grid-object"];
    // classes.push(props.object.type);

    const val = gridObjectValue(props.object);

    return <div className={classes.join(" ")}>{val}</div>;
};

const CellObjectTroopPlus = (props: { object: GridObject }) => {
    const value = gridObjectValue(props.object);
    const valueStr = value > 0 ? `+${value}` : value.toString();
    return <div className="grid-object troop-plus">{valueStr}</div>;
}

const CellObjectTroopMulti = (props: { object: GridObject }) => {
    const value = gridObjectValue(props.object);
    const valueStr = `x${value}`;
    return <div className="grid-object troop-multi">{valueStr}</div>;
}

export default GridView;
