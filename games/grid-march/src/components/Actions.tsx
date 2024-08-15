import { useSnapshot } from "valtio";
import { GAMESTATUS, gameStore, GameStore, MOVEDIRECTION } from "../stores/GameStore";
import { Troop, TROOPSTATUS } from "../models/Troops.model";
import { createGrid } from "../utils/gridUtils";

const Actions = () => {
    const snap = useSnapshot(gameStore) as GameStore;

    function process() {
        snap.process();
    }

    function reset() {
        const grid = createGrid(8, 50);

        const troop: Troop = {
            id: "troop-1",
            col: 3,
            rowDiff: 0,

            size: 20,
            status: TROOPSTATUS.ALIVE,
        };

        snap.reset(grid, [troop]);
    }

    function left() {
        snap.move("troop-1", MOVEDIRECTION.LEFT);
    }

    function right() {
        snap.move("troop-1", MOVEDIRECTION.RIGHT);
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
