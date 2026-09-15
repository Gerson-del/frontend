export interface Column<T> {
  id: string;
  header: string;
  render: (item: T) => React.ReactNode;
  /** Ancho mínimo de la columna (ej. "8rem"), útil con table-fixed */
  minWidth?: string;
  /** Oculta la columna en pantallas menores a `md` */
  hideOnMobile?: boolean;
}
