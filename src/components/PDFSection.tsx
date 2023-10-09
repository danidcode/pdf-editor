import { DraggableItem } from "../interfaces/draggable-item"
import { PDFSection as PDFSectionProps } from "../interfaces/pdf-section"
import DropZone from "./DropZone"
import { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
    section: PDFSectionProps
    droppedItems: DraggableItem[]
    handleDeleteItem: (id: UniqueIdentifier) => void
}

const PDFSection = ({
    section,
    droppedItems,
    handleDeleteItem
}: Props) => {

    const { type, title, allowedItems, forbiddenDestinations } = section
    return (
        <div className="bg-neutral-drop-zone px-4 py-4 space-y-4 rounded " >
            <span className="text-secondary font-inter">{title}</span>

            <DropZone sectionType={type} allowedItems={allowedItems} droppedItems={droppedItems}
                forbiddenDestinations={forbiddenDestinations} handleDeleteItem={handleDeleteItem} />

        </div>
    )

}

export default PDFSection