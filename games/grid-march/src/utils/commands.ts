import effectStore from "../stores/EffectStore";
import { levelStore } from "../stores/LevelStore";

/**
 * Process the game by one tick
 * 
 * This function exectures all process functions on each store
 */
export function mainProcess() {
    levelStore.process();
    effectStore.process();

}
