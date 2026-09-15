import type { Key } from "react";
import { Column } from "@/types/table";

type tableVariant = "primary" | "colored";
type textPosition = "left" | "center" | "right";
type tableSize = "sm" | "md" | "lg";

interface DataTableProps<T> {
  variant?: tableVariant;
  size?: tableSize;
  textPosition?: textPosition;
  data: T[];
  columns: Column<T>[];
  getRowKey: (item: T) => Key;
}

// Despues voy a cambiar el como se muestra la informacion, queda pendiente
export default function DataTable<T>({
  variant = "primary",
  textPosition = "left",
  size = "md",
  data,
  columns,
  getRowKey,
}: DataTableProps<T>) {
  const variants = {
    primary: "",
    colored: "group-hover:bg-blue-400 group-hover:text-white",
  };

  const textPositions = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const tableSizes = { sm: "max-h-60", md: "max-h-80", lg: "max-h-[32rem]" };
  return (
    <div
      className={`overflow-y-auto ${tableSizes[size]} overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm`}
    >
      <div className="overflow-x-auto">
        <table
          className={`w-full table-fixed border-collapse ${textPositions[textPosition]}`}
        >
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              {columns.map((column) => (
                <th
                  key={column.header}
                  className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={getRowKey(item)}
                className="group border-b border-gray-100 last:border-b-0"
              >
                {columns.map((column, index) => (
                  <td
                    key={column.header}
                    className={`
                      px-5
                      py-4
                      text-sm
                      text-gray-700
                      transition-colors
                      duration-150
                      ${variants[variant]}
                      ${index === 0 ? "group-hover:rounded-l-xl" : ""}
                      ${index === columns.length - 1 ? "group-hover:rounded-r-xl" : ""}
                    `}
                  >
                    <div className="min-w-0 whitespace-normal break-words">
                      {column.render(item)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
