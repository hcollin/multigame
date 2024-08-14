import { useSnapshot } from "valtio";
import { gameStore, GameStore } from "../store/GameStore";


const Moves = () => {
    
    const snap = useSnapshot(gameStore) as GameStore;

    return (
        <div className="moves">
            {snap.moves}
        </div>
    )

}


export default Moves;