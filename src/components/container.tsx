import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto max-w-[120rem] px-8", className)}>
      {children}
    </div>
  );
};

export default Container;
