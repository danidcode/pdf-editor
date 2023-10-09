import { DraggableItemType } from "../types/draggable-item";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PDFSectionType } from "../types/pdf-section";

export interface DraggableItem  {
    id: UniqueIdentifier | string;
    type: DraggableItemType
    title: string
    icon: React.ReactNode
    section?: PDFSectionType
}

