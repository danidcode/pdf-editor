import { Active, UniqueIdentifier } from '@dnd-kit/core';
import { draggableItems } from '../constants/draggable-items';
import { DraggableItem as DraggableItemProps } from '../interfaces/draggable-item';
import DraggableItem from './DraggableItem';


type Props = {
    activeItem: Active
    droppedItems: DraggableItemProps[]
    handleDeleteItem?: (id: UniqueIdentifier) => void
}

const findactiveItem = (
    activeItem: Active,
    droppedItems: DraggableItemProps[]
) => {
    let item = draggableItems.find((item) => item.id === activeItem.id);

    if (!item && droppedItems.length) {
        item = droppedItems.find((droppedItem) => droppedItem.id === activeItem.id);

        if (item) {
            item = {
                ...item,
                icon: activeItem.data.current?.icon,
                title: activeItem.data.current?.title,
            }
        }
    }

    return item;
};

const DraggableItemSelector = ({ activeItem, droppedItems, handleDeleteItem }: Props) => {

    const item = findactiveItem(activeItem, droppedItems);

    if (!item) return null;

    return <DraggableItem item={item} handleDeleteItem={handleDeleteItem} />;

}

export default DraggableItemSelector