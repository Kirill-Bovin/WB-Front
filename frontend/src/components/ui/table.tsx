// src/components/ui/table.tsx
export const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full border">{children}</table>
);
export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100">{children}</thead>
);
export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);
export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr>{children}</tr>
);
export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border px-3 py-1">{children}</td>
);