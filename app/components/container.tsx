import type { ReactNode } from "react";
import cc from "classcat";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      id="container"
      className={cc(["max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className])}
    >
      {children}
    </div>
  );
}
