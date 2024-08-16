import { useState } from "react";
import { GameSettings } from "../models/GameSettings";
import { useSnapshot } from "valtio";
import { gameStore, GameStore } from "../store/GameStore";

import "../styles/general-button.css";
import "./menu.css";


const DEFAULTSETTINGS: { name: string; conf: GameSettings }[] = [
    {
        name: "Very easy",
        conf: {
            name: "Very easy",
            colors: 3,
            parts: 3,
            multiplier: 2,
        },
    },
    {
        name: "Easy",
        conf: {
            name: "Easy",
            colors: 4,
            parts: 4,
            multiplier: 2,
        },
    },
    {
        name: "Medium",
        conf: {
            name: "Medium",
            colors: 5,
            parts: 5,
            multiplier: 2,
        },
    },
    {
        name: "Hard",
        conf: {
            name: "Hard",
            colors: 6,
            parts: 6,
            multiplier: 2,
        },
    },
    {
        name: "Nightmare",
        conf: {
            name: "Nightmare",
            colors: 6,
            parts: 9,
            multiplier: 3,
        },
    },
];

const Menu = () => {
    const snap = useSnapshot(gameStore) as GameStore;

    const [colors, setColors] = useState<number>(4);
    const [parts, setParts] = useState<number>(6);
    const [multiplier, setMultiplier] = useState<number>(1);

    const [showCustom, setShowCustom] = useState<boolean>(false);

    function newGame() {
        snap.newGame({
            name: "Custom",
            colors: colors,
            parts: parts,
            multiplier: multiplier,
        });
    }

    function newDifficultyGame(settings: GameSettings) {
        snap.newGame(settings);
    }

    return (
        <nav>
            {!showCustom &&
                DEFAULTSETTINGS.map((settingsItem) => (
                    <button key={settingsItem.name} onClick={() => newDifficultyGame(settingsItem.conf)} className="general-button">
                        {settingsItem.name}
                    </button>
                ))}
            <button onClick={() => setShowCustom((p) => !p)} className="general-button">{showCustom ? "Cancel" : "Custom"}</button>
            {showCustom && (
                <div className="custom">
                    <label>Colors</label>
                    <input
                        type="number"
                        value={colors}
                        onChange={(e) => setColors(parseInt(e.target.value))}
                        min="3"
                        max="6"
                    />

                    <label>Parts</label>
                    <input
                        type="number"
                        value={parts}
                        onChange={(e) => setParts(parseInt(e.target.value))}
                        min="3"
                        max="7"
                    />

                    <label>Multiplier</label>
                    <input
                        type="number"
                        value={multiplier}
                        onChange={(e) => setMultiplier(parseInt(e.target.value))}
                        min="1"
                        max="5"
                    />
                </div>
            )}

            {showCustom && <button onClick={newGame} className="general-button">Start</button>}
        </nav>
    );
};

export default Menu;
