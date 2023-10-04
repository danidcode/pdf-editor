import { DraggableElementType } from "../types/draggable-element";
import { PDFSectionType } from "../types/pdf-section";

export interface PDFSection  {
    type: PDFSectionType
    title: string
    allowedElements: DraggableElementType[]
    forbiddenDestinations?: PDFSectionType[]
}