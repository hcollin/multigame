import { iBottle } from "../models/Bottle.model";
import { getTopColorCount } from "../utils/bottleUtils";

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

    const topColorSize = getTopColorCount(props.bottle);

    return (
        <div className={`bottle ${props.source ? "source" : ""} ${props.target ? "target" : ""} ${props.bottle.completed ? "completed" : ""}`} onClick={handleClick}>
            {props.bottle.parts.map((part, i) => {
                return (
                    <BottlePart key={part.id} color={part.color} partCount={props.bottle.partCount} hightlight={props.source && i < topColorSize} />
                );
            })}
        </div>
    );
};


const BottlePart = (props: { color: string, partCount: number, hightlight: boolean }) => {
    const classes: string[] = ["part"];
    if (props.hightlight) classes.push("highlight");
    classes.push(PARTCLASSES[props.partCount]);

    return (
        <div className={classes.join(" ")} style={{ backgroundColor: props.color }}></div>
    );
}

export default Bottle;
