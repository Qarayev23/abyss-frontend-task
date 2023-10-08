import { useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "./thottle";

type Position = {
    x: number;
    y: number;
};

type UseDraggableOptions = {
    onDrag?: (position: Position) => Position;
    isCenter?: boolean;
};

export const useDraggable = ({ onDrag = (pos) => pos, isCenter }: UseDraggableOptions = {}) => {
    const [pressed, setPressed] = useState(false);
    const ref = useRef<HTMLElement | null>(null);
    const unsubscribe = useRef<() => void>(() => { });
    const elementRef = ref.current?.offsetWidth
    const screenWidth = Number(window.innerWidth / 2) - Number(elementRef! / 2);
    const initialScreenWidth = Number(window.innerWidth / 2) - 110;
    const position = useRef<Position>({ x: screenWidth || initialScreenWidth, y: 0 });

    const legacyRef = useCallback((elem: HTMLElement | null) => {
        ref.current = elem;
        if (unsubscribe.current) {
            unsubscribe.current();
        }
        if (!elem) {
            return;
        }
        const handleMouseDown = () => {
            if (!elem.style) {
                return;
            }
            elem.style.userSelect = "none";
            setPressed(true);
        };
        elem.addEventListener("mousedown", handleMouseDown);
        unsubscribe.current = () => {
            if (elem.style) {
                elem.style.userSelect = "auto";
            }
            elem.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    useEffect(() => {
        if (!pressed) {
            return;
        }
        if (isCenter) {
            const pos = position.current;
            pos.x = screenWidth
            pos.y = 0
        }
        const handleMouseMove = throttle((event: MouseEvent) => {
            if (!ref.current || !position.current) {
                return;
            }
            const pos = position.current;
            const elem = ref.current;

            position.current = onDrag({
                x: pos.x + event.movementX,
                y: pos.y + event.movementY,
            });

            if (elem.style) {
                elem.style.position = "static";
                elem.style.left = "initial";
                elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
            }
        });
        const handleMouseUp = () => {
            if (ref.current && ref.current.style) {
                ref.current.style.userSelect = "auto";
            }
            setPressed(false);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            handleMouseMove.cancel();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [pressed, onDrag]);

    useEffect(() => {
        if (isCenter && ref.current) {
            ref.current.style.transform = `translate(${screenWidth}px, 0)`;
            ref.current.style.position = "static";
        }
    }, [isCenter]);

    return [legacyRef, pressed] as const;
};