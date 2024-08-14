import { useState } from "react";
import { GameSettings } from "../models/GameSettings";

import "./menu.css";
import { useSnapshot } from "valtio";
import { gameStore, GameStore } from "../store/GameStore";

const DEFAULTSETTINGS: { name: string; conf: GameSettings }[] = [
    {
        name: "Very easy",
        conf: {
            colors: 3,
            parts: 3,
            multiplier: 2,
        },
    },
    {
        name: "Easy",
        conf: {
            colors: 4,
            parts: 4,
            multiplier: 2,
        },
    },
    {
        name: "Medium",
        conf: {
            colors: 5,
            parts: 5,
            multiplier: 2,
        },
    },
    {
        name: "Hard",
        conf: {
            colors: 6,
            parts: 6,
            multiplier: 2,
        },
    },
    {
        name: "Nightmare",
        conf: {
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
                    <button key={settingsItem.name} onClick={() => newDifficultyGame(settingsItem.conf)}>
                        {settingsItem.name}
                    </button>
                ))}

            <button onClick={() => setShowCustom((p) => !p)}>Show Custom</button>
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

            <button onClick={newGame}>New</button>
        </nav>
    );
};

export default Menu;
