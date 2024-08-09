export interface iBottle {
    id: string;
    partCount: number;
    parts: iBottlePart[];
    completed: boolean;
}

export interface iBottlePart {
    id: string;
    color: string;
}
