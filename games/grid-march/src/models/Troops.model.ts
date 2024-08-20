

export enum TROOPSTATUS {
    ALIVE = "alive",
    DEAD = "dead",
}


export enum TROOPEFFECTS {
    JUMPING = "jumping",
    
}

export interface Troop {
    id: string;
    size: number;

    col: number;
    rowDiff: number;    // Usually 0   

    status: TROOPSTATUS;

    effects: TROOPEFFECTS[];

    active: boolean;
}