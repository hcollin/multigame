import { useSnapshot } from "valtio";
import { GAMESTATUS, gameStore, GameStore, MOVEDIRECTION } from "../stores/GameStore";
import { createGrid } from "../utils/gridUtils";
import { createTroop } from "../utils/troopUtils";
import { mainProcess } from "../utils/commands";

import KeyButton from "./KeyButton";

import arrow from "../assets/arrow.svg";

import "./actions.css";

const Actions = () => {
    const snap = useSnapshot(gameStore) as GameStore;

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

        const troop = createTroop({ col: 3, size: 20 });

        snap.reset(grid, [troop]);
    }

    function left() {
        console.log("LEFT");
        if (snap.troops.length === 0) {
            console.error("No troops to move!", snap);
            return;
        }
        const tid = snap.troops[0].id;
        if (tid) {
            if (snap.move(tid, MOVEDIRECTION.LEFT)) mainProcess();
        }
    }

    function right() {
        if (snap.troops.length === 0) {
            console.error("No troops to move!", snap);
            return;
        }
        const tid = snap.troops[0].id;
        if (tid) {
            if (snap.move(tid, MOVEDIRECTION.RIGHT)) mainProcess();
        }
    }    

    if (snap.status === GAMESTATUS.INIT) {
        <div className="actions">
            <button onClick={start}>Start</button>
        </div>;
    }

    return (
        <div className="actions">
            {snap.status === GAMESTATUS.PLAY && (
                <div className="keys">
                    <KeyButton onClick={left} bindToKey="ArrowLeft"><img className="left" src={arrow} /></KeyButton>
                    <KeyButton onClick={process} bindToKey="ArrowUp" className="forward"><img className="forward" src={arrow} /></KeyButton>
                    <KeyButton onClick={right} bindToKey="ArrowRight"><img className="right" src={arrow} /></KeyButton>
                </div>
            )}
            <button onClick={reset}>Reset</button>

            <span>{snap.status}</span>
        </div>
    );
};

export default Actions;
