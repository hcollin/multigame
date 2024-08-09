import { iBottle } from "../models/Bottle.model";

import "./bottle.css";

const PARTCLASSES: string[] = [
    "none",
    "one-part",
    "two-part",
    "three-part",
    "four-part",
    "five-part",
    "six-part",
    "seven-part",
    "eight-part",
    "nine-part",
];

interface BottleProps {
    bottle: iBottle;
    onSelect: (b: iBottle) => void;
    source: boolean;
    target: boolean;
}

const Bottle = (props: BottleProps) => {
    
    function handleClick() {
        if(props.bottle.completed) return;
        props.onSelect(props.bottle);
    }

    return (
        <div className={`bottle ${props.source ? "source" : ""} ${props.target ? "target" : ""} ${props.bottle.completed ? "completed" : ""}`} onClick={handleClick}>
            {props.bottle.parts.map((part) => {
                return (
                    <div
                        key={part.id}
                        className={`part ${PARTCLASSES[props.bottle.partCount]} `}
                        style={{ backgroundColor: part.color }}
                    ></div>
                );
            })}
        </div>
    );
};

export default Bottle;
