import { levelStore } from "../stores/LevelStore";

let keyHandler: null | ((e: KeyboardEvent) => void) = null;

export interface KeyboardCommandOptions {
	preventDefault?: boolean;
	keyMap?: { [key: string]: string };
}

export function keyboardCommands(onEvent: (key: string) => void, options?: KeyboardCommandOptions) {
	if (keyHandler !== null) {
		document.removeEventListener("keydown", keyHandler);
		keyHandler = null;
	}

	keyHandler = (event: KeyboardEvent) => {
        if (options?.keyMap) {
			const valid = options.keyMap[event.key];
			if (valid) {
                console.log(`Valid key ${event.key}`);
				if (options?.preventDefault) event.preventDefault();
				onEvent(event.key);
			}
            return;
		}

		if (options?.preventDefault) event.preventDefault();
		onEvent(event.key);
	};

	document.addEventListener("keydown", keyHandler);
}
