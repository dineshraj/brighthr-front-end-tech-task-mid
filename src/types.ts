export interface FileItem {
  name: string;
  type: string;
  added?: string;
  files?: FileItem[];
}
