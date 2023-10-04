import { useDraggable } from '@dnd-kit/core';
import { DraggableElement as DraggableElementProps } from '../interfaces/draggable-element';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
    element: DraggableElementProps
    padding?: number
    showCloseButton?: boolean
}
const DraggableElement = ({ element, padding = 6, showCloseButton = false }: Props) => {

    const { type, title, icon, id, section } = element

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

        <div className={`bg-white p-${padding} shadow-md rounded cursor-grab ${isDragging && 'opacity-40'} `} ref={setNodeRef} {...attributes} {...listeners} key={id}>

            <div className='flex flex-col space-y-1 items-center ' >
                {/* {showCloseButton && <AiOutlineClose size={20} className='cursor-pointer hover:opacity-40' />} */}
                {icon}
                <span className='text-secondary font-inter text-xs text-center'> {title}</span>
            </div>

        </div>

    )
}

export default DraggableElement