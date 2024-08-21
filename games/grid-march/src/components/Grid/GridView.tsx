import { useSnapshot } from "valtio";
import { LevelStore, levelStore } from "../../stores/LevelStore";
import { Cell, Row } from "../../models/Grid.model";
import { Troop, TROOPSTATUS } from "../../models/Troops.model";
import TroopCell from "./TroopCell";
import BackgroundTile from "./BackgroundTile";
import CellObject from "./CellObject";

import "./grid-view.css";

const GridView = () => {
	const snap = useSnapshot(levelStore) as LevelStore;

	const visibility = 15;

	const finalRow = Math.min(snap.row + visibility, snap.grid.size[0]);

	const rows = snap.grid.rows.filter((r) => r.row >= snap.row && r.row < finalRow).reverse();
	const emptyRowCount = visibility - rows.length;

	const emptyRows = new Array(emptyRowCount).fill("jee");

	return (
		<div className="grid-view">
			{emptyRows.map((_, i) => (
				<GridEmptyRow key={`empty-row-${i}`} />
			))}
			{rows.map((r) => {
				return <GridRow row={r} troops={snap.troops} gameRow={snap.row} key={`grid-row-${r.row}`} lastRow={r.row === snap.grid.size[0] - 1} />;
			})}
		</div>
	);
};

const GridRow = (props: { row: Row; troops: Troop[]; gameRow: number; lastRow: boolean }) => {
	const cells = props.row.cells;
	const classes = `grid-row ${props.lastRow ? "last-row" : ""}`;

	return (
		<div className={classes}>
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
			<BackgroundTile type={props.cell.type} />
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

export default GridView;
