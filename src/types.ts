export interface FileItem {
  id?: number;
  name: string;
  type: string;
  added?: string;
  files?: FileItem[];
}
