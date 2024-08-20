import { FC, useEffect, useState } from "react";

import "./key-button.css";

export type KeyButtonProps = {
	onClick: () => void;
	children?: React.ReactNode;
	className?: string;
	bindToKey?: string|string[];
	disabled?: boolean;
};

const KeyButton: FC<KeyButtonProps> = (props) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => {
		if (props.bindToKey) {
			const keys = Array.isArray(props.bindToKey) ? props.bindToKey : [props.bindToKey];
			const keyHandler = (event: KeyboardEvent) => {
				if (keys.includes(event.key)) {
					if(props.disabled) return;
					props.onClick();
					setIsActive(true);

					setTimeout(() => {
						setIsActive(false);
					}, 200);
				} 
			};
			document.addEventListener("keydown", keyHandler);
			return () => {
				document.removeEventListener("keydown", keyHandler);
			};
		}
	}, [props.bindToKey, props.disabled]);


	function click() {
		if(props.disabled) return;
		props.onClick();
	}


	const classes = `key-button ${props.className || ""} ${[isActive ? "active" : ""]} ${props.disabled ? "disabled" : ""}`;

	return (
		<button className={classes} onClick={click}>
			{props?.children || "A"}
		</button>
	);
};

export default KeyButton;
