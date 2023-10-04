import { useDroppable } from "@dnd-kit/core";

import { DraggableElementType } from "../types/draggable-element";
import { PDFSectionType } from "../types/pdf-section";
import DraggableElement from "./DraggableElement";
import { DraggableElement as DraggableElementProps } from "../interfaces/draggable-element";
import { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
    sectionType: PDFSectionType
    allowedElements: DraggableElementType[]
    droppedElements: DraggableElementProps[]
    forbiddenDestinations?: PDFSectionType[]
    handleDeleteElement: (id: UniqueIdentifier) => void
}
const DropZone = ({ sectionType, allowedElements, droppedElements, forbiddenDestinations, handleDeleteElement }: Props) => {

    const { setNodeRef, isOver } = useDroppable({
        id: sectionType,
        data: {
            accepts: allowedElements,
            ...(forbiddenDestinations !== undefined ? { forbiddenDestinations: forbiddenDestinations } : {})
        },
    });

    if (droppedElements.length) {
        return (
            <div className={`space-y-2  ${isOver && 'opacity-40'} `} ref={setNodeRef} >
                {
                    droppedElements.map((droppedElements) => {

                        return (
                            <DraggableElement element={droppedElements} padding={12} key={droppedElements.id} handleDeleteElement={handleDeleteElement} />
                        )
                    })
                }
            </div>
        )
    }

    return (


        <div className={`bg-white rounded flex justify-center px-16 lg:px-64 py-16 border-dashed border border-secondary ${isOver && 'opacity-40'}`} ref={setNodeRef}  >


            <span>
                Drag and drop an element within this area.
            </span>



        </div>
    )
}

export default DropZone