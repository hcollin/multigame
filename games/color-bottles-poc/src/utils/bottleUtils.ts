import { iBottle, iBottlePart } from "../models/Bottle.model";
import { bottleIsDone } from "./bottleValidator";

export function getTopColorCount(b: iBottle): number {
    if (b.parts.length === 0) return 0;
    const color = b.parts[0].color;
    let count = 0;
    for (let i = 0; i < b.parts.length; i++) {
        if (b.parts[i].color === color) {
            count++;
        } else {
            return count;
        }
    }
    return count;
}

export function bottlePour(source: iBottle, target: iBottle): boolean {
    // Is target bottle full?
    if (target.parts.length - 1 >= target.partCount) return false;

    // Is source bottle empty?
    if (source.parts.length === 0) return false;

    // Is target bottle completed?
    if (target.completed) return false;

    // Get parts from the top of the source bottle (shift) until another color is encountered
    const mParts: iBottlePart[] = [];

    let ok = true;

    const color: string = source.parts[0].color;

    while (ok) {
        try {
            const part = source.parts.shift();
            if (part) {
                if (part.color === color) {
                    mParts.push(part);
                } else {
                    ok = false;
                    source.parts.unshift(part);
                }
            } else {
                ok = false;
            }
        } catch (e) {
            console.log(`ERROR OCCURED WHILE POURING PARTS FROM SOURCE (${source.id}) TO TARGET (${target.id})`);
            console.error(e);
            ok = false;
        }
    }

    // If there is no room in the target bottle, put the parts back in the source bottle
    if (target.parts.length + mParts.length > target.partCount) {
        mParts.forEach((p) => source.parts.unshift(p));
        return false;
    }

    // Add the parts to the target bottle
    mParts.forEach((p) => target.parts.unshift(p));

    // target.parts.unshift(mPart);
    console.log(`Pource ${mParts.length} parts of ${color} from ${source.id} to ${target.id}`);

    if (bottleIsDone(target)) {
        target.completed = true;
    }
    return true;
}
