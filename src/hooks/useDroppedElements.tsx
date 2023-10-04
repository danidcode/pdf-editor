import {
    Active,
    Over,
    UniqueIdentifier
} from '@dnd-kit/core';
import { nanoid } from 'nanoid/non-secure';
import { useState } from 'react';
import { DraggableElement } from '../interfaces/draggable-element';
import { PDFSectionType } from '../types/pdf-section';

import 'react-hot-toast';
import toast from 'react-hot-toast';
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter';


export function useDroppedElements() {
    const [droppedElements, setDroppedElements] = useState<DraggableElement[]>([]);

    const addDroppedElement = (active: Active, over: Over | null) => {
        const updatedDroppedElements = [...droppedElements];

        const indexToRemove = updatedDroppedElements.findIndex((element) => element.id === active.id);

        const droppedElement = {
            id: nanoid(11),
            title: active?.data?.current?.title,
            type: active?.data?.current?.type,
            icon: active?.data?.current?.icon,
            section: over?.id as PDFSectionType
        };

        if (indexToRemove !== -1) {
            updatedDroppedElements.splice(indexToRemove, 1);
        }

        setDroppedElements([...updatedDroppedElements, droppedElement]);

        toast.success(`${capitalizeFirstLetter(active?.data?.current?.type)} ${active?.data?.current?.section ? 'moved'
            : 'added'} successfully!`, {
            position: 'top-center',
        });
    };

    const deleteDroppedElement = (id: UniqueIdentifier) => {

        const updatedDroppedElements = droppedElements.filter((element) => element.id !== id)
        toast.success(`Element deleted successfully!`, {
            position: 'top-center',
        });
        setDroppedElements(updatedDroppedElements);
    }
    return { droppedElements, addDroppedElement, deleteDroppedElement };
}