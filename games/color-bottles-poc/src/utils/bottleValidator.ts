import { iBottle } from "../models/Bottle.model";

export function bottleIsDone(b: iBottle): boolean {
	if (b.parts.length !== b.partCount) return false;

	const tColor = b.parts[0].color;
	for (let i = 1; i < b.parts.length; i++) {
		if (b.parts[i].color !== tColor) return false;
	}

	return true;
}

export function bottleIsEmpty(b: iBottle): boolean {
	return b.parts.length === 0;
}

export function bottleHasEmptyParts(b: iBottle, partCount: number): boolean {
    return b.parts.length + partCount <= b.partCount;
}

export function win(bottles: iBottle[]): boolean {
	let doneCount = 0;
	for (let i = 0; i < bottles.length; i++) {
		const b = bottles[i];
		if (b.completed) doneCount++;
		if (bottleIsEmpty(bottles[i])) {
			doneCount++;
		}
	}

	return doneCount === bottles.length;
}
