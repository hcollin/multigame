import { useSnapshot } from "valtio";
import { gameStore, GameStore } from "../../store/GameStore";

import "./info-bar-item.css";

const Score = () => {
    
    const snap = useSnapshot(gameStore) as GameStore;

    return (
        <div className="info-bar-item">
            <label>Score</label>
            <span>{snap.score}</span>
        </div>
    )

}


export default Score;