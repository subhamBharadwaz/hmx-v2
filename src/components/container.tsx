import * as React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto max-w-[120rem] px-8",
      className
    )}
    {...props}
  />
))
Container.displayName = "Card"

export default Container;