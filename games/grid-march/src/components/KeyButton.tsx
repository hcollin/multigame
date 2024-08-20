import { FC, useEffect, useState } from "react";

import "./key-button.css";

export type KeyButtonProps = {
	onClick: () => void;
	children?: React.ReactNode;
	className?: string;
	bindToKey?: string;
};

const KeyButton: FC<KeyButtonProps> = (props) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => {
		if (props.bindToKey) {
			const keyHandler = (event: KeyboardEvent) => {
				if (event.key === props.bindToKey) {
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
	}, [props.bindToKey]);

	const classes = `key-button ${props.className || ""} ${[isActive ? "active" : ""]}`;

	return (
		<button className={classes} onClick={props.onClick}>
			{props?.children || "A"}
		</button>
	);
};

export default KeyButton;
