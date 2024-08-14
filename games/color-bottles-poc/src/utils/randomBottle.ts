import { arnd, shuffle } from "rndlib";
import { iBottle } from "../models/Bottle.model";

let id = 0;
let partId = 0;

const AVAILABLECOLORS = ["red", "green", "blue", "yellow", "purple", "brown", "pink", "orange", "cyan", "magenta"];

export function randomBottle(partCount = 4): iBottle {
    id++;
    const b: iBottle = {
        id: `bottle-${id}`,
        partCount: partCount,
        parts: [],
        completed: false,
    };

    for (let i = 0; i < partCount; i++) {
        partId++;
        b.parts.push({
            id: `bpart-${partId}`,
            color: arnd(["red", "green", "blue", "yellow", "purple", "orange"]),
        });
    }

    return b;
}

/**
 * Generate colors based on parameters
 *
 * @param partCount
 * @param colorCount
 * @returns
 */
export function generateColors(multiplier = 1, partCount = 4, colorCount = 4): string[] {
    const colors: string[] = [];

    if (colorCount >= AVAILABLECOLORS.length + 1)
        throw new Error(`Too many colors requested. Max is ${AVAILABLECOLORS.length}`);

    for (let m = 0; m < multiplier; m++) {
        for (let c = 0; c < colorCount; c++) {
            const color = AVAILABLECOLORS[c];
            for (let p = 0; p < partCount; p++) {
                colors.push(color);
            }
        }
    }

    return colors;
}

export function generateBottlesForColors(colors: string[], partCount: number): iBottle[] {
    const rcolors = shuffle(colors);

    const bottleCount = rcolors.length / partCount + 1;

    const bottles: iBottle[] = [];

    for (let b = 0; b < bottleCount; b++) {
        id++;
        const b: iBottle = {
            id: `bottle-${id}`,
            partCount: partCount,
            parts: [],
            completed: false,
        };

        for (let p = 0; p < partCount; p++) {
            const col = rcolors.pop();
            if (col) {
                b.parts.push({
                    id: `bpart-${partId++}`,
                    color: col,
                });
            }
        }

        bottles.push(b);
    }

    return bottles;
}
