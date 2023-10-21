import {
    Active,
    Over,
    UniqueIdentifier
} from '@dnd-kit/core';
import { nanoid } from 'nanoid/non-secure';
import { useState } from 'react';
import { Item } from '../interfaces/item';
import { PDFSectionType } from '../types/pdf-section';

import 'react-hot-toast';
import toast from 'react-hot-toast';
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter';
import { arrayMove } from '@dnd-kit/sortable';
import { PDFSections } from '../constants/pdf-sections';


export function useItems() {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (active: Active, over: Over | null, showToast = true) => {
        const updatedItems = [...items];

        const indexToRemove = updatedItems.findIndex((item) => item.id === active.id);
        console.log(over)
        const section = PDFSections.some((section) => section.type === over?.id)
            ? over?.id
            : PDFSections.find((section) => over?.data?.current?.section === section.type)?.type

        console.log(over?.data?.current?.section)
        const droppedItem = {
            id: nanoid(11),
            title: active?.data?.current?.title,
            type: active?.data?.current?.type,
            icon: active?.data?.current?.icon,
            section: section as PDFSectionType
        };
        console.log(droppedItem)
        if (indexToRemove !== -1) {
            updatedItems.splice(indexToRemove, 1);
        }

        setItems([...updatedItems, droppedItem]);
        if (showToast) {
            toast.success(`${capitalizeFirstLetter(active?.data?.current?.type)} ${active?.data?.current?.section ? 'moved'
                : 'added'} successfully!`, {
                position: 'top-center',
            });
        }

    };

    const deleteItem = (id: UniqueIdentifier) => {

        const updatedItems = items.filter((item) => item.id !== id)
        toast.success(`Item deleted successfully!`, {
            position: 'top-center',
        });
        setItems(updatedItems);
    }

    const reorderItems = (active: Active, over: Over | null) => {

        setItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over?.id);
            return arrayMove(items, oldIndex, newIndex);
        });
    }
    return { items, addItem, deleteItem, reorderItems };
}