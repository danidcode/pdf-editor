import {
    Active,
    Over,
    UniqueIdentifier
} from '@dnd-kit/core';
import { nanoid } from 'nanoid/non-secure';
import { useState } from 'react';
import { DraggableItem } from '../interfaces/draggable-item';
import { PDFSectionType } from '../types/pdf-section';

import 'react-hot-toast';
import toast from 'react-hot-toast';
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter';


export function useDroppedItems() {
    const [droppedItems, setDroppedItems] = useState<DraggableItem[]>([]);

    const addDroppedItems = (active: Active, over: Over | null) => {
        const updatedDroppedItems = [...droppedItems];

        const indexToRemove = updatedDroppedItems.findIndex((item) => item.id === active.id);

        const droppedItem = {
            id: nanoid(11),
            title: active?.data?.current?.title,
            type: active?.data?.current?.type,
            icon: active?.data?.current?.icon,
            section: over?.id as PDFSectionType
        };

        if (indexToRemove !== -1) {
            updatedDroppedItems.splice(indexToRemove, 1);
        }

        setDroppedItems([...updatedDroppedItems, droppedItem]);

        toast.success(`${capitalizeFirstLetter(active?.data?.current?.type)} ${active?.data?.current?.section ? 'moved'
            : 'added'} successfully!`, {
            position: 'top-center',
        });
    };

    const deleteDroppedItems = (id: UniqueIdentifier) => {

        const updatedDroppedItems = droppedItems.filter((item) => item.id !== id)
        toast.success(`Item deleted successfully!`, {
            position: 'top-center',
        });
        setDroppedItems(updatedDroppedItems);
    }
    return { droppedItems, addDroppedItems, deleteDroppedItems };
}