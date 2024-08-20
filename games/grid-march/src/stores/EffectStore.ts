import { proxy } from "valtio";

interface TroopDamageEffect {
    damageValue: number;
    troopId: string;
    col: number;
    row: number;
    visible: boolean;
}

export interface EffectStore {
    damage: TroopDamageEffect[];

    process: () => void;
}

const effectStore = proxy<EffectStore>({
    damage: [],

    process: () => {
        // console.log("Processing effects");
    },
});

export default effectStore;
