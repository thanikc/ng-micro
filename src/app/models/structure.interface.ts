export interface StructureItem {
  id: string;
  title: string;
  src: string;
  dependencies?: string[];
  props?: { [key: string]: any }
}
