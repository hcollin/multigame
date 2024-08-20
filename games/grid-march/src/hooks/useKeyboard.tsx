import { useEffect, useState } from "react"


export const useKeyboard = (key: string, handler: () => void) => {

    const [presses, setPresses] = useState<number>(0);
    const [listener, setListerner] = useState<(() => void) | null>(null);

    useEffect(() => {

        const downHandler = (e: KeyboardEvent) => {
            if(e.key === key) {
                handler();
                setPresses((prev: number) => prev + 1);
            }
        };

        // const upHandler = (e: KeyboardEvent) => {
        //     if(e.key === key) {
        //         setPresses(0);
        //     }
        // };

        window.addEventListener("keydown", downHandler);
        // window.addEventListener("keyup", upHandler);

        setListerner(() => {
            window.removeEventListener("keydown", downHandler);
            // window.removeEventListener("keyup", upHandler);
        });

        return () => {
            if(listener) {
                listener();
            }
        }

    }, [key, handler]);


    return presses;
}