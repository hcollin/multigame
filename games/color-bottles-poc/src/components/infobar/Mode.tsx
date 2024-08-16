import { useSnapshot } from "valtio";
import { gameStore, GameStore } from "../../store/GameStore";

import "./info-bar-item.css";

const Mode = () => {
    
    const snap = useSnapshot(gameStore) as GameStore;

    return (
        <div className="info-bar-item">
            
            <label>{snap.settings.name}</label>
        </div>
    )

}


export default Mode;