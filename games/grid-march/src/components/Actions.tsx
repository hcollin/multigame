import { useSnapshot } from "valtio";
import { GAMESTATUS, gameStore, GameStore, MOVEDIRECTION } from "../stores/GameStore";
import { createGrid } from "../utils/gridUtils";
import { createTroop } from "../utils/troopUtils";
import { mainProcess } from "../utils/commands";

import { useEffect } from "react";
import { keyboardCommands } from "../utils/keyboardCommands";


const Actions = () => {
    const snap = useSnapshot(gameStore) as GameStore;

    useEffect(() => {
        if(snap.status === GAMESTATUS.PLAY) {
            keyboardCommands(handleKey, {
                keyMap: { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up"},
            });
        }
        
    }, [snap]);

    function process() {
        // snap.process();
        mainProcess();
    }

    function handleKey(key: string) {
        if(snap.status !== GAMESTATUS.PLAY) return;
        switch (key) {
            case "ArrowLeft":
                left();
                break;
            case "ArrowRight":
                right();
                break;
            case "ArrowUp":
                process();
                break;
        }

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
                <>
                    <button onClick={left}>Left</button>
                    <button onClick={process}>Forward</button>
                    <button onClick={right}>Right</button>
                </>
            )}
            <button onClick={reset}>Reset</button>

            <span>{snap.status}</span>
        </div>
    );
};

export default Actions;
