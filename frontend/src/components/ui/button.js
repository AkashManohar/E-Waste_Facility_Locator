import * as React from "react";
import { cn } from "../../lib/utils";


export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn("px-4 py-2 bg-green-600 text-white rounded-md", className)}
      {...props}
    >
      {children}
    </button>
  );
}
