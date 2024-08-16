import Mode from "./Mode";
import Moves from "./Moves"
import Score from "./Score";

import "./info-bar.css";

const InfoBar = () => {

    return (
        <div className="info-bar">
            <Moves />
            <Score />
            <Mode />
        </div>
    );
}

export default InfoBar;