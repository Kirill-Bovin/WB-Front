import { jsx as _jsx } from "react/jsx-runtime";
export const Card = ({ children, className = "" }) => (_jsx("div", { className: `border rounded shadow-sm p-4 bg-white ${className}`, children: children }));
export const CardContent = ({ children }) => (_jsx("div", { children: children }));
