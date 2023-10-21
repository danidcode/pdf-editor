import { useDraggable } from "@dnd-kit/core";
import { Item } from '../interfaces/item';

type Props = {
    item: Item

}
const DraggableItem = ({ item }: Props) => {

    const { type, title, icon, id, section } = item

    const { attributes, listeners, setNodeRef, isDragging, } = useDraggable({
        id: id,
        data: {
            type: type,
            title: title,
            icon: icon,
            ...(section ? { section: section } : {})
        }
    });


    return (
        <div className={`flex flex-col items-end ${item.section && 'p-6'}  bg-white shadow-sm  rounded cursor-grab 
        ${isDragging && 'opacity-40'}  `} ref={setNodeRef} {...attributes} {...listeners} key={id} >
            <div className={`bg-white p-6 w-full `} >

                <div className='flex flex-col space-y-1 items-center ' >

                    {icon}
                    <span className='text-secondary font-inter text-xs text-center'> {title}</span>
                </div>

            </div>
        </div>
    )
}

export default DraggableItem