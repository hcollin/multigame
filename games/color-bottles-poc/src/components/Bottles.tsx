import { useSnapshot } from "valtio";
import { GameStore, gameStore } from "../store/GameStore";
import Bottle from "./Bottle";
import { iBottle } from "../models/Bottle.model";
import { useEffect, useState } from "react";

const Bottles = () => {
    const snap = useSnapshot(gameStore) as GameStore;

    const [source, setSource] = useState<iBottle | null>(null);
    const [target, setTarget] = useState<iBottle | null>(null);

    useEffect(() => {
        if (source && target) {
            const success = snap.pour(source.id, target.id);
            if (success) {
                setSource(null);
            }
            // bottlePour(source, target);

            // if (win(bottles)) {
            //     console.log("You win");
            //     setGameOver(true);
            // }

            setTarget(null);
        }
    }, [source, target]);

    function selectBottle(b: iBottle) {
        // if (gameOver) return;

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

    return (
        <div className="bottles">
            {snap.bottles.map((bottle) => (
                <Bottle
                    key={bottle.id}
                    bottle={bottle}
                    target={target && target.id === bottle.id ? true : false}
                    source={source && source.id === bottle.id ? true : false}
                    onSelect={selectBottle}
                />
            ))}
        </div>
    );
};

export default Bottles;
