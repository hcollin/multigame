import { useSnapshot } from "valtio";
import effectStore from "../stores/EffectStore";



const EffectsView = () => {

    const effSnap = useSnapshot(effectStore);

    console.log(effSnap);

    return null;
}


export default EffectsView;