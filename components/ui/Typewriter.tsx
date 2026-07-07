"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utilts";

type Word = {
    text: string;
    className?: string;
};

type Props = {
    words: Word[];
    className?: string;
    cursorClassName?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetweenWords?: number;
};

export function TypewriterInfinite({
    words,
    className,
    cursorClassName,
    typingSpeed = 80,
    deletingSpeed = 40,
    delayBetweenWords = 1200,
}: Props) {
    const textRef = useRef<HTMLSpanElement>(null);
    const timeoutRef = useRef<number | null>(null);
    const wordIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);
    const classNameRef = useRef(words[0]?.className ?? "");
    const [currentClassName, setCurrentClassName] = useState(words[0]?.className ?? "");

    const wordsKey = useMemo(
        () => words.map((word) => `${word.text}|${word.className ?? ""}`).join("::"),
        [words]
    );

    useEffect(() => {
        const textElement = textRef.current;
        if (!textElement || words.length === 0) return;

        wordIndexRef.current = 0;
        charIndexRef.current = 0;
        isDeletingRef.current = false;
        classNameRef.current = words[0]?.className ?? "";
        setCurrentClassName(words[0]?.className ?? "");
        textElement.textContent = "";

        const clearTimer = () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        const run = () => {
            const currentWord = words[wordIndexRef.current];
            if (!currentWord) return;

            const nextClassName = currentWord.className ?? "";
            if (classNameRef.current !== nextClassName) {
                classNameRef.current = nextClassName;
                setCurrentClassName(nextClassName);
            }

            if (!isDeletingRef.current) {
                charIndexRef.current += 1;
                textElement.textContent = currentWord.text.slice(0, charIndexRef.current);

                if (charIndexRef.current >= currentWord.text.length) {
                    timeoutRef.current = window.setTimeout(() => {
                        isDeletingRef.current = true;
                        run();
                    }, delayBetweenWords);
                    return;
                }

                timeoutRef.current = window.setTimeout(run, typingSpeed);
                return;
            }

            charIndexRef.current -= 1;
            textElement.textContent = currentWord.text.slice(0, Math.max(0, charIndexRef.current));

            if (charIndexRef.current <= 0) {
                isDeletingRef.current = false;
                wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
                timeoutRef.current = window.setTimeout(run, typingSpeed);
                return;
            }

            timeoutRef.current = window.setTimeout(run, deletingSpeed);
        };

        run();

        return clearTimer;
    }, [wordsKey, typingSpeed, deletingSpeed, delayBetweenWords]);

    return (
        <span className={cn("inline-flex items-center justify-center flex-wrap", className)}>
            <span ref={textRef} className={cn("text-inherit", currentClassName)} />
            <span
                aria-hidden
                className={cn(
                    "inline-block ml-1 w-[3px] shrink-0 animate-pulse bg-current",
                    cursorClassName
                )}
                style={{ height: "1em" }}
            />
        </span>
    );
}
