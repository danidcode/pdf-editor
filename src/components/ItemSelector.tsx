import { Active, UniqueIdentifier } from '@dnd-kit/core';
import { Item } from '../interfaces/item';
import { findactiveItem } from '../utils/find-active-item';
import { isSortable } from '../utils/is-sortable';
import DraggableItem from './DraggableItem';
import SortableItem from './SortableItem';


type Props = {
    activeItem: Active
    items: Item[]
    handleDeleteItem?: (id: UniqueIdentifier) => void
}

const ItemSelector = ({ activeItem, items, handleDeleteItem }: Props) => {

    const item = findactiveItem(activeItem, items);

    if (!item) return null;

    return <SortableItem item={item} handleDeleteItem={handleDeleteItem} />


}

export default ItemSelector