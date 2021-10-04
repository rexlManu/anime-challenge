import React, { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
}

export function Tooltip({ children }: TooltipProps) {
  return (
    <div className="absolute bottom-0 flex flex-col items-center transition opacity-0 mb-9 group-hover:opacity-100 w-60">
      <span className="relative z-10 p-2 text-xs leading-none whitespace-no-wrap bg-gray-800 rounded-lg shadow-lg text-gray-50">
        {children}
      </span>
      <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-800"></div>
    </div>
  );
}
