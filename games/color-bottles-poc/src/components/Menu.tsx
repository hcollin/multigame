import { useState } from "react";
import { GameSettings } from "../models/GameSettings";

interface MenuProps {
    click: (settings: GameSettings) => void;
}

const Menu = (props: MenuProps) => {
    const [colors, setColors] = useState<number>(4);
    const [parts, setParts] = useState<number>(6);

    function backToSite() {
        console.log("BACK TO SITE!");
    }

    function newGame() {
        props.click({
            colors: colors,
            parts: parts,
            multiplier: 1,
        });
    }

    return (
        <nav>
            <button onClick={backToSite}>Main Site</button>

            <label>Colors</label>
            <input type="number" value={colors} onChange={(e) => setColors(parseInt(e.target.value))} />

            <label>Parts</label>
            <input type="number" value={parts} onChange={(e) => setParts(parseInt(e.target.value))} />

            <button onClick={newGame}>New</button>
        </nav>
    );
};

export default Menu;
