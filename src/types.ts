export interface FileItem {
  id?: string;
  name: string;
  type: string;
  added?: string;
  files?: FileItem[];
}
