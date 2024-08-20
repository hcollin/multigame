import { useSnapshot } from "valtio";
import { gameStore } from "../stores/GameStore";


const Score = () => {
    const snap = useSnapshot(gameStore);
    return (
        <div>
            <h1>Score: {snap.score}</h1>
        </div>
    )
}

export default Score;