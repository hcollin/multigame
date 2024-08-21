import { GAMEVIEWSTATE } from "../../App";
import KeyButton from "../KeyButton";


interface StoreViewProps {
    changeState: (state: GAMEVIEWSTATE) => void;
}

const StoreView = (props: StoreViewProps) => {

    function back() {
        props.changeState(GAMEVIEWSTATE.MAINMENU);
    }

    return (
        <div>
            <h1>Store</h1>

            <KeyButton onClick={back} className="wide">Back</KeyButton>
        </div>
    )
}


export default StoreView;