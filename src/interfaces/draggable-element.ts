import { DraggableElementType } from "../types/draggable-element";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PDFSectionType } from "../types/pdf-section";

export interface DraggableElement  {
    id: UniqueIdentifier | string;
    type: DraggableElementType
    title: string
    icon: React.ReactNode
    section?: PDFSectionType
}

