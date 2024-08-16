import { useSnapshot } from "valtio";
import { gameStore, GameStore } from "../../store/GameStore";

import "./info-bar-item.css";

const Moves = () => {
    
    const snap = useSnapshot(gameStore) as GameStore;

    return (
        <div className="info-bar-item">
            <label>Moves</label>
            <span>{snap.moves}</span>
        </div>
    )

}


export default Moves;