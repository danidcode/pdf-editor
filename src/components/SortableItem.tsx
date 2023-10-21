import { UniqueIdentifier } from "@dnd-kit/core";
import { AiOutlineDelete } from 'react-icons/ai';
import { Item } from '../interfaces/item';
import IconButton from './IconButton';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
    item: Item
    handleDeleteItem?: (id: UniqueIdentifier) => void
}
const SortableItem = ({ item, handleDeleteItem }: Props) => {

    const { type, title, icon, id, section } = item

    const { attributes, listeners, setNodeRef, isDragging, transform,
        transition, } = useSortable({
            id: id,
            data: {
                type: type,
                title: title,
                icon: icon,
                ...(section ? { section: section } : {})
            }
        });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleClick = () => {
        if (!handleDeleteItem) return null
        handleDeleteItem(item.id)
    }

    return (
        <div className={`flex flex-col items-end ${item.section && 'p-6'}  bg-white shadow-sm  rounded cursor-grab 
        ${isDragging && 'opacity-40'}  `} ref={setNodeRef} {...attributes} {...listeners} key={id} style={style}>
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

export default SortableItem