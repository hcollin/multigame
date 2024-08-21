import { useSnapshot } from "valtio";
import KeyButton from "./KeyButton";
import { levelStore } from "../stores/LevelStore";
import gameStore, { newGame } from "../stores/GameStore";
import { createGrid } from "../utils/gridUtils";
import { createTroop } from "../utils/troopUtils";
import { levelParser } from "../data/levels/levelParser";

import level0 from "../data/levels/level-0.level?raw";
import { GAMEVIEWSTATE } from "../App";

interface MainMenuProps {
	changeState: (state: GAMEVIEWSTATE ) => void;
}

const MainMenu = (props: MainMenuProps) => {
	const level = useSnapshot(levelStore);
	const game = useSnapshot(gameStore);

	function startNewGame() {
		newGame();

		const grid = createGrid(8, 50);
		const troop = createTroop({ col: 3, size: game.troops || 20, active: true });

		levelStore.reset(grid, [troop]);

		props.changeState(GAMEVIEWSTATE.GAME);
	}

	function loadLevel(levelData: string) {
		try {
			const g = levelParser(levelData);
			const troop = createTroop({ col: Math.floor(g.size[1] / 2), size: game.troops, active: true });

			levelStore.reset(g, [troop]);

			props.changeState(GAMEVIEWSTATE.GAME);
		} catch (e) {
			console.error("Error loading level", e);
            props.changeState(GAMEVIEWSTATE.MAINMENU);
		}
	}

	return (
		<div className="main-menu">
			<h1>Grid March</h1>

			<KeyButton onClick={startNewGame} className="wide">
				New Game
			</KeyButton>

			<KeyButton onClick={() => loadLevel(level0)} className="wide">
				Level 0
			</KeyButton>
		</div>
	);
};

export default MainMenu;
