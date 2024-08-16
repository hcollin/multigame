

export enum TROOPSTATUS {
    ALIVE = "alive",
    DEAD = "dead",
}


export interface Troop {
    id: string;
    size: number;

    col: number;
    rowDiff: number;    // Usually 0   

    status: TROOPSTATUS;
}