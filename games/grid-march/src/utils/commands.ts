import effectStore from "../stores/EffectStore";
import { gameStore } from "../stores/GameStore";

/**
 * Process the game by one tick
 * 
 * This function exectures all process functions on each store
 */
export function mainProcess() {
    gameStore.process();
    effectStore.process();

}
