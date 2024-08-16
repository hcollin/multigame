import "./App.css";
import Menu from "./components/Menu";
import Bottles from "./components/Bottles";
import InfoBar from "./components/infobar/InfoBar";
import BackToSite from "./components/BackToSite";

function App() {
    return (
        <>
            <BackToSite />
            <Menu />
            <Bottles />
            <InfoBar />
        </>
    );
}

export default App;
