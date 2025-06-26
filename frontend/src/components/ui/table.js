import { jsx as _jsx } from "react/jsx-runtime";
// src/components/ui/table.tsx
export const Table = ({ children }) => (_jsx("table", { className: "w-full border", children: children }));
export const TableHeader = ({ children }) => (_jsx("thead", { className: "bg-gray-100", children: children }));
export const TableBody = ({ children }) => (_jsx("tbody", { children: children }));
export const TableRow = ({ children }) => (_jsx("tr", { children: children }));
export const TableCell = ({ children }) => (_jsx("td", { className: "border px-3 py-1", children: children }));
