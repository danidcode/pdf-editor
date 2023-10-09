import { DraggableItemType } from "../types/draggable-item";
import { PDFSectionType } from "../types/pdf-section";

export interface PDFSection  {
    type: PDFSectionType
    title: string
    allowedItems: DraggableItemType[]
    forbiddenDestinations?: PDFSectionType[]
}