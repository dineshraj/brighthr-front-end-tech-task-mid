export interface FileItem {
  name: string;
  type: string;
  added: string;
}

export interface FolderItem {
  id: string;
  name: string;
  type: string;
  files?: FileItem[];
}

export type DataItem = FileItem | FolderItem;