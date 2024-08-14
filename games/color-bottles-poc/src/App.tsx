import { useEffect, useState } from "react";
import "./App.css";
import Bottle from "./components/Bottle";
import { iBottle } from "./models/Bottle.model";
import { generateBottlesForColors, generateColors } from "./utils/randomBottle";
import { bottleIsDone, win } from "./utils/bottleValidator";
import Menu from "./components/Menu";
import { GameSettings } from "./models/GameSettings";
import { bottlePour } from "./utils/bottleUtils";



function App() {
    const [bottles, setBottles] = useState<iBottle[]>([]);

    const [source, setSource] = useState<iBottle | null>(null);
    const [target, setTarget] = useState<iBottle | null>(null);

    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        if (source && target) {

            bottlePour(source, target);

            if(win(bottles)) {
                console.log("You win");
                setGameOver(true);
            }

            setTarget(null);
            setSource(null);
        }
    }, [source, target]);

    function selectBottle(b: iBottle) {
        
        if(gameOver) return;

        if (!source) {
            if (b.parts.length === 0) return;
            setSource(b);
            return;
        }

        if (!target && source !== null && source.id !== b.id) {
            
            
            if (b.parts.length >= b.partCount) return;
            if (b.completed) return;

            setTarget(b);
            return;
        }

        if (source && source.id === b.id) {
            setSource(null);
            return;
        }
    }

    // function restart() {
    //     setTarget(null);
    //     setSource(null);
    //     setGameOver(false);

    //     resetGame();
    // }

    function resetGame(settings: GameSettings = { colors: 4, parts: 6, multiplier: 1 }) {
        setTarget(null);
        setSource(null);
        setGameOver(false);
        const colorArray = generateColors(settings.multiplier, settings.parts, settings.colors);

        const newBottles = generateBottlesForColors(colorArray, settings.parts);

        setBottles(newBottles);
    }

    return (
        <>
        <Menu click={resetGame}/>
            <div className="bottles">
                {bottles.map((bottle) => (
                    <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        target={target && target.id === bottle.id ? true : false}
                        source={source && source.id === bottle.id ? true : false}
                        onSelect={selectBottle}
                    />
                ))}

                {gameOver && <div className="game-over">
                    
                    <p>Game Over</p>
                    
                </div>}
            </div>
        </>
    );
}

export default App;
