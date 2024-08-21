import "./App.css";
import GridView from "./components/Grid/GridView";
import Actions from "./components/Actions";
import Score from "./components/Score";
import { useState } from "react";
import MainMenu from "./components/MainMenu";
import StoreView from "./components/Store/StoreView";



export enum GAMEVIEWSTATE {
    MAINMENU = "MAINMENU",
    SHOP = "SHOP",
    GAME = "GAME"
}




function App() {

    const [state, setState] = useState<GAMEVIEWSTATE>(GAMEVIEWSTATE.MAINMENU    );

    function changeState(newState: GAMEVIEWSTATE) {
        setState(newState);
    }

    if(state === "MAINMENU") {
        return <MainMenu changeState={changeState} />
    }

    if(state === "SHOP") {
        return <StoreView changeState={changeState} />
    }

    // Actual Game View    
    return (
        <>
            <Score />
            <GridView />
            <Actions changeState={changeState} />
        </>
    );
}

export default App;
