import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { AiOutlineDelete } from 'react-icons/ai';
import { DraggableItem as DraggableItemProps } from '../interfaces/draggable-item';
import IconButton from './IconButton';

type Props = {
    item: DraggableItemProps
    handleDeleteItem?: (id: UniqueIdentifier) => void
}
const DraggableItem = ({ item, handleDeleteItem }: Props) => {

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


    const handleClick = () => {
        if (!handleDeleteItem) return null
        handleDeleteItem(item.id)
    }

    return (
        <div className={`flex flex-col items-end ${item.section && 'p-6'}  bg-white shadow-sm  rounded cursor-grab 
        ${isDragging && 'opacity-40'}  `} ref={setNodeRef} {...attributes} {...listeners} key={id} >
            {handleDeleteItem && (
                <IconButton icon={<AiOutlineDelete size={20} />} onClick={handleClick} position='absolute' />)}
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