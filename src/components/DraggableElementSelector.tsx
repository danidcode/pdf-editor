import { Active } from '@dnd-kit/core';
import { draggableElements } from '../constants/draggable-elements';

import DraggableElement from './DraggableElement';
import { DraggableElement as DraggableElementProps } from '../interfaces/draggable-element';

type Props = {
    activeElement: Active
    droppedElements: DraggableElementProps[]

}

const findActiveElement = (
    activeElement: Active,
    droppedElements: DraggableElementProps[]
) => {
    let element = draggableElements.find((el) => el.id === activeElement.id);

    if (!element && droppedElements.length) {
        element = droppedElements.find((droppedElement) => droppedElement.id === activeElement.id);

        if (element) {
            element = {
                ...element,
                icon: activeElement.data.current?.icon,
                title: activeElement.data.current?.title,
            }
        }
    }

    return element;
};

const DraggableElementSelector = ({ activeElement, droppedElements }: Props) => {

    const element = findActiveElement(activeElement, droppedElements);

    if (!element) return null;

    return <DraggableElement element={element} padding={element.section ? 12 : 6} />;

}

export default DraggableElementSelector