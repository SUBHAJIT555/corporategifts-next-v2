"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";
import {
  motion,
  useInView,
  type HTMLMotionProps,
  type UseInViewOptions,
  type Variants,
} from "framer-motion";

type ViewMargin = UseInViewOptions["margin"];

export const revealVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

/** @deprecated Use `revealVariants` */
export const heroRevealVariants = revealVariants;

type RevealContextValue = {
  ref: RefObject<HTMLElement | null>;
  once: boolean;
  margin: ViewMargin;
};

const RevealContext = createContext<RevealContextValue | null>(null);

type TimelineContentProps<T extends keyof HTMLElementTagNameMap> = {
  children?: ReactNode;
  animationNum: number;
  className?: string;
  timelineRef: RefObject<HTMLElement | null>;
  as?: T;
  customVariants?: Variants;
  once?: boolean;
  margin?: ViewMargin;
} & HTMLMotionProps<T>;

export const TimelineContent = <T extends keyof HTMLElementTagNameMap = "div">({
  children,
  animationNum,
  timelineRef,
  className,
  as,
  customVariants,
  once = true,
  margin = "-80px 0px -80px 0px",
  ...props
}: TimelineContentProps<T>) => {
  const sequenceVariants = customVariants || revealVariants;

  const isInView = useInView(timelineRef, {
    once,
    margin,
  });

  const MotionComponent = motion[as || "div"] as ElementType;

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

type RevealSectionProps = {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  once?: boolean;
  margin?: ViewMargin;
} & Record<string, unknown>;

export function RevealSection({
  children,
  className,
  as: Component = "div",
  once = true,
  margin = "-80px 0px -80px 0px",
  ...props
}: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const value = useMemo(
    () => ({ ref, once, margin }),
    [once, margin]
  );

  return (
    <RevealContext.Provider value={value}>
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    </RevealContext.Provider>
  );
}

type RevealProps<T extends keyof HTMLElementTagNameMap> = {
  animationNum: number;
  children?: ReactNode;
  className?: string;
  as?: T;
  variants?: Variants;
} & Omit<
  HTMLMotionProps<T>,
  "initial" | "animate" | "custom" | "variants" | "children"
>;

export function Reveal<T extends keyof HTMLElementTagNameMap = "div">({
  animationNum,
  children,
  className,
  as,
  variants,
  ...props
}: RevealProps<T>) {
  const ctx = useContext(RevealContext);

  if (!ctx) {
    const Fallback = (as || "div") as ElementType;
    return <Fallback className={className}>{children}</Fallback>;
  }

  return (
    <TimelineContent
      animationNum={animationNum}
      timelineRef={ctx.ref}
      customVariants={variants ?? revealVariants}
      once={ctx.once}
      margin={ctx.margin}
      as={as}
      className={className}
      {...props}
    >
      {children}
    </TimelineContent>
  );
}
