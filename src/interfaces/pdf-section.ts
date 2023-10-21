import { ItemType } from "../types/item";
import { PDFSectionType } from "../types/pdf-section";

export interface PDFSection  {
    type: PDFSectionType
    title: string
    allowedItems: ItemType[]
    forbiddenDestinations?: PDFSectionType[]
}