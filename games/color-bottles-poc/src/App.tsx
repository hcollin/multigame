import "./App.css";
import Menu from "./components/Menu";
import Bottles from "./components/Bottles";
import Moves from "./components/Moves";

function App() {
    

    // const [source, setSource] = useState<iBottle | null>(null);
    // const [target, setTarget] = useState<iBottle | null>(null);

    // const [gameOver, setGameOver] = useState(false);

    // useEffect(() => {
    //     resetGame();
    // }, []);

    // useEffect(() => {
    //     if (source && target) {
    //         bottlePour(source, target);

    //         if (win(bottles)) {
    //             console.log("You win");
    //             setGameOver(true);
    //         }

    //         setTarget(null);
    //         setSource(null);
    //     }
    // }, [source, target]);

    // function selectBottle(b: iBottle) {
    //     if (gameOver) return;

    //     if (!source) {
    //         if (b.parts.length === 0) return;
    //         setSource(b);
    //         return;
    //     }

    //     if (!target && source !== null && source.id !== b.id) {
    //         if (b.parts.length >= b.partCount) return;
    //         if (b.completed) return;

    //         setTarget(b);
    //         return;
    //     }

    //     if (source && source.id === b.id) {
    //         setSource(null);
    //         return;
    //     }
    // }

    // function resetGame(settings: GameSettings = { colors: 4, parts: 6, multiplier: 1 }) {
    //     setTarget(null);
    //     setSource(null);
    //     setGameOver(false);
    //     const colorArray = generateColors(settings.multiplier, settings.parts, settings.colors);

    //     const newBottles = generateBottlesForColors(colorArray, settings.parts);

    //     setBottles(newBottles);
    // }

    return (
        <>
            <Menu />
            <Bottles />
            <Moves />
            
            {/* <div className="bottles">
                {bottles.map((bottle) => (
                    <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        target={target && target.id === bottle.id ? true : false}
                        source={source && source.id === bottle.id ? true : false}
                        onSelect={selectBottle}
                    />
                ))}

                {gameOver && (
                    <div className="game-over">
                        <p>Game Over</p>
                    </div>
                )}
            </div> */}
        </>
    );
}

export default App;
