import { BiImage } from 'react-icons/bi';
import { ImTable } from 'react-icons/im';
import { PiTextAlignJustifyBold } from 'react-icons/pi';
import { DraggableElement } from '../interfaces/draggable-element';
import { nanoid } from 'nanoid';

export const draggableElements: DraggableElement[] = [
    {
        id: nanoid(11),
        type: 'text',
        title: 'Text',
        icon: <PiTextAlignJustifyBold size={40} />,

    },
    {
        id: nanoid(11),
        type: 'image',
        title: 'Image',
        icon: <BiImage size={40} />,

    },
    {
        id: nanoid(11),
        type: 'table',
        title: 'Table',
        icon: <ImTable size={40} />,

    },

]
