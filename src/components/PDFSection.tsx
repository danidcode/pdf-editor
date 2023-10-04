import { DraggableElement } from "../interfaces/draggable-element"
import { PDFSection as PDFSectionProps } from "../interfaces/pdf-section"
import DropZone from "./DropZone"

type Props = {
    section: PDFSectionProps
    droppedElements: DraggableElement[]
}

const PDFSection = ({
    section,
    droppedElements
}: Props) => {

    const { type, title, allowedElements, forbiddenDestinations } = section
    return (
        <div className="bg-neutral-drop-zone px-4 py-4 space-y-4 rounded " >
            <span className="text-secondary font-inter">{title}</span>

            <DropZone sectionType={type} allowedElements={allowedElements} droppedElements={droppedElements} forbiddenDestinations={forbiddenDestinations} />

        </div>
    )

}

export default PDFSection