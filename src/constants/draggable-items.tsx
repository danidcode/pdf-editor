import { nanoid } from 'nanoid';
import { BiImage } from 'react-icons/bi';
import { ImTable } from 'react-icons/im';
import { PiTextAlignJustifyBold } from 'react-icons/pi';
import { Item } from '../interfaces/item';

export const draggableItems: Item[] = [
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
