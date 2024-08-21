import { useSnapshot } from "valtio";
import { GAMESTATUS, levelStore, LevelStore, MOVEDIRECTION } from "../stores/LevelStore";
import { createGrid } from "../utils/gridUtils";
import { createTroop, splitTroop } from "../utils/troopUtils";
import { mainProcess } from "../utils/commands";

import KeyButton from "./KeyButton";

import arrow from "../assets/arrow.svg";

import "./actions.css";
import { Troop, TROOPEFFECTS } from "../models/Troops.model";
import { useEffect, useState } from "react";

const Actions = () => {
	const [activeTrooper, setActiveTrooper] = useState<Troop | null>(null);
	const snap = useSnapshot(levelStore) as LevelStore;

	useEffect(() => {
		setActiveTrooper((prev) => {
			const at = snap.getActiveTroop();
			if (at && at.id === prev?.id) return prev;

			return at;
		});
	}, [snap]);

	function process() {
		// snap.process();
		mainProcess();
	}

	function start() {
		snap.reset(createGrid(8, 50), [createTroop({ col: 3, size: 20 })]);
		// snap.start();
	}

	function reset() {
		const grid = createGrid(8, 50);

		const troop = createTroop({ col: 3, size: 20, active: true });

		snap.reset(grid, [troop]);
	}

	function left() {
		if (snap.troops.length === 0) {
			console.error("No troops to move!", snap);
			return;
		}
		const at = snap.getActiveTroop();
		if (at) {
			const tid = at.id;

			if (tid) {
				if (snap.move(tid, MOVEDIRECTION.LEFT)) mainProcess();
			}
		}
	}

	function right() {
		if (snap.troops.length === 0) {
			console.error("No troops to move!", snap);
			return;
		}
		const at = snap.getActiveTroop();
		if (at) {
			const tid = at.id;
			if (tid) {
				if (snap.move(tid, MOVEDIRECTION.RIGHT)) mainProcess();
			}
		}
	}

	function forward() {
		const at = snap.getActiveTroop();
		if (at) {
			const tid = at.id;
			if (tid) {
				if (snap.move(tid, MOVEDIRECTION.FORWARD)) mainProcess();
			}
		}
	}

	function split() {
		const at = snap.getActiveTroop();
		if (at && at.size > 2) {
			const nt = splitTroop(at);
			if (nt.col >= snap.grid.size[1] - 1) {
				nt.col = snap.grid.size[1] - 1;
			}
			if (at.col < 0) at.col = 0;
			snap.addNewTroop(nt);
			mainProcess();
		}
	}

	function jump() {
		console.log("Jumping!");
		snap.jumpTroop();
	}

	function loopTroops() {
		snap.setNextTroopActive();
	}

	if (snap.status === GAMESTATUS.INIT) {
		<div className="actions">
			<button onClick={start}>Start</button>
		</div>;
	}

	const troopIsJumping = activeTrooper === null ? false : activeTrooper.effects.includes(TROOPEFFECTS.JUMPING);
	console.log("Active troop is jumping?", troopIsJumping, activeTrooper?.id);

	return (
		<div className="actions">
			{snap.status === GAMESTATUS.PLAY && (
				<>
					<div className="keys">
						<KeyButton onClick={left} bindToKey="ArrowLeft" disabled={troopIsJumping}>
							<img className="left" src={arrow} />
						</KeyButton>
						<KeyButton onClick={forward} bindToKey="ArrowUp" className="forward">
							<img className="forward" src={arrow} />
						</KeyButton>

						<KeyButton onClick={right} bindToKey="ArrowRight" disabled={troopIsJumping}>
							<img className="right" src={arrow} />
						</KeyButton>
					</div>

					<div className="keys">
						<KeyButton onClick={split} bindToKey="ArrowDown">
							Split
						</KeyButton>

						<KeyButton onClick={jump} bindToKey={["j", "J"]}>
							Jump
						</KeyButton>
					</div>

					{snap.troops.length > 1 && (
						<div className="keys">
							<KeyButton onClick={loopTroops} bindToKey="Shift" className="oneline">
								Next Troop
							</KeyButton>
						</div>
					)}
				</>
			)}

			<KeyButton onClick={reset} className="wide">
				Reset
			</KeyButton>
		</div>
	);
};

export default Actions;
