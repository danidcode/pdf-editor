import { useDroppable } from "@dnd-kit/core";

import { DraggableItemType } from "../types/draggable-item";
import { PDFSectionType } from "../types/pdf-section";
import DraggableItem from "./DraggableItem";
import { DraggableItem as DraggableItemProps } from "../interfaces/draggable-item";
import { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
    sectionType: PDFSectionType
    allowedItems: DraggableItemType[]
    droppedItems: DraggableItemProps[]
    forbiddenDestinations?: PDFSectionType[]
    handleDeleteItem: (id: UniqueIdentifier) => void
}
const DropZone = ({ sectionType, allowedItems, droppedItems, forbiddenDestinations, handleDeleteItem }: Props) => {

    const { setNodeRef, isOver } = useDroppable({
        id: sectionType,
        data: {
            accepts: allowedItems,
            ...(forbiddenDestinations !== undefined ? { forbiddenDestinations: forbiddenDestinations } : {})
        },
    });

    if (droppedItems.length) {
        return (
            <div className={`space-y-2  ${isOver && 'opacity-40'} `} ref={setNodeRef} >
                {
                    droppedItems.map((droppedItems) => {

                        return (
                            <DraggableItem item={droppedItems} key={droppedItems.id} handleDeleteItem={handleDeleteItem} />
                        )
                    })
                }
            </div>
        )
    }

    return (


        <div className={`bg-white rounded flex justify-center px-16 lg:px-64 py-16 
        border-dashed border border-secondary ${isOver && 'opacity-40'}`} ref={setNodeRef}  >


            <span>
                Drag and drop an item within this area.
            </span>



        </div>
    )
}

export default DropZone