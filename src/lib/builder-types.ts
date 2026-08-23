export type ElementType = string;

export interface ElementData {
  id: string;
  type: ElementType;
  content: Record<string, any>;
  settings: Record<string, any>;
}

export interface ColumnData {
  id: string;
  width: string; // e.g., '1/1', '1/2', '1/3'
  elements: ElementData[];
  settings: Record<string, any>;
}

export interface RowData {
  id: string;
  layout: string; // e.g., '1/1', '1/2+1/2'
  columns: ColumnData[];
  settings: Record<string, any>;
}

export interface PageBuilderContextType {
  rows: RowData[];
  updateRow: (id: string, data: any) => void;
  removeRow: (id: string) => void;
  cloneRow: (id: string) => void;
  setColumnLayout: (rowId: string, layout: string) => void;
  addElement: (rowId: string, colId: string, type: ElementType) => void;
  updateElement: (rowId: string, colId: string, elId: string, data: any) => void;
  removeElement: (rowId: string, colId: string, elId: string) => void;
  cloneElement: (rowId: string, colId: string, elId: string) => void;
  moveRowUp: (id: string) => void;
  moveRowDown: (id: string) => void;
  moveElementUp: (rowId: string, colId: string, elId: string) => void;
  moveElementDown: (rowId: string, colId: string, elId: string) => void;
  openElementSettings: (rowId: string, colId: string, el: ElementData) => void;
  openAddElement: (rowId: string, colId: string) => void;
}
