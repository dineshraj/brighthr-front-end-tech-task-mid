export interface FileItem {
  name: string;
  type: string;
  added: string;
  size: string;
}

export interface FolderItem {
  id: string;
  name: string;
  type: string;
  added: string;
  size: string;
  files?: DataItem[];
}

export type DataItem = FileItem | FolderItem;