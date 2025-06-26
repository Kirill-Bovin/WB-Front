// src/components/ui/card.tsx
import React from "react";

type Props = {
  children: React.ReactNode
  className?: string
}

export const Card = ({ children, className = "" }: Props) => (
  <div className={`border rounded shadow-sm p-4 bg-white ${className}`}>
    {children}
  </div>
)

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);



