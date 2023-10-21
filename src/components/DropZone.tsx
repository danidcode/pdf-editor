import { useDroppable } from "@dnd-kit/core";

import { UniqueIdentifier } from "@dnd-kit/core";
import { Item } from "../interfaces/item";
import { ItemType } from "../types/item";
import { PDFSectionType } from "../types/pdf-section";
import SortableItem from "./SortableItem";
import { SortableContext } from "@dnd-kit/sortable";

type Props = {
    sectionType: PDFSectionType
    allowedItems: ItemType[]
    droppedItems: Item[]
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

    return (
        <SortableContext items={droppedItems}>
            {
                droppedItems.length ? (
                    <div className={`space-y-2  ${isOver && 'opacity-40'} `} ref={setNodeRef} >
                        {
                            droppedItems.map((droppedItems) => {

                                return (
                                    <SortableItem item={droppedItems} key={droppedItems.id}
                                        handleDeleteItem={handleDeleteItem} />
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className={`bg-white rounded flex justify-center px-16 lg:px-64 py-16 
                                        border-dashed border border-secondary 
                                        ${isOver && 'opacity-40'}`} ref={setNodeRef}  >


                        <span>
                            Drag and drop an item within this area.
                        </span>



                    </div>
                )
            }
        </SortableContext>

    )

}

export default DropZone