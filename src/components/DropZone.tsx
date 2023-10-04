import { useDroppable } from "@dnd-kit/core";

import { DraggableElementType } from "../types/draggable-element";
import { PDFSectionType } from "../types/pdf-section";
import DraggableElement from "./DraggableElement";
import { DraggableElement as DraggableElementProps } from "../interfaces/draggable-element";

type Props = {
    sectionType: PDFSectionType
    allowedElements: DraggableElementType[]
    droppedElements: DraggableElementProps[]
    forbiddenDestinations?: PDFSectionType[]
}
const DropZone = ({ sectionType, allowedElements, droppedElements, forbiddenDestinations }: Props) => {

    const { setNodeRef, isOver } = useDroppable({
        id: sectionType,
        data: {
            accepts: allowedElements,
            ...(forbiddenDestinations !== undefined ? { forbiddenDestinations: forbiddenDestinations } : {})
        },
    });

    if (droppedElements.length) {
        return (
            <div className={`space-y-2 ${isOver && 'opacity-40'}`} ref={setNodeRef} >
                {
                    droppedElements.map((droppedElements) => {

                        return (
                            <DraggableElement element={droppedElements} padding={12} key={droppedElements.id} showCloseButton={true} />
                        )
                    })
                }
            </div>
        )
    }

    return (


        <div className={`bg-white rounded flex justify-center px-64 py-16 border-dashed border border-secondary ${isOver && 'opacity-40'}`} ref={setNodeRef}  >


            <span>
                Drag and drop an element within this area.
            </span>



        </div>
    )
}

export default DropZone