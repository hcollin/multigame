import { useSnapshot } from "valtio";
import { levelStore } from "../stores/LevelStore";


const Score = () => {
    const snap = useSnapshot(levelStore);
    return (
        <div>
            <h1>Score: {snap.score}</h1>
        </div>
    )
}

export default Score;