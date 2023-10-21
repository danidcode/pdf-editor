import { ItemType } from "../types/item";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PDFSectionType } from "../types/pdf-section";

export interface Item  {
    id: UniqueIdentifier | string;
    type: ItemType
    title: string
    icon: React.ReactNode
    section?: PDFSectionType
}

