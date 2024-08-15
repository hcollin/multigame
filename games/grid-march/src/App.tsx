import { useEffect } from "react";
import "./App.css";
import GridView from "./components/GridView";
import { gameStore } from "./stores/GameStore";
import { createGrid } from "./utils/gridUtils";
import Actions from "./components/Actions";
import { Troop, TROOPSTATUS } from "./models/Troops.model";

function App() {
    // Create first Grid
    useEffect(() => {
        const grid = createGrid(8, 50);

        const troop: Troop = {
            id: "troop-1",
            col: 3,
            rowDiff: 0,

            size: 20,
            status: TROOPSTATUS.ALIVE,
        };

        gameStore.reset(grid, [troop]);
    }, []);

    return (
        <>
            <h1>Grid March</h1>
            <GridView />
            <Actions />
        </>
    );
}

export default App;
