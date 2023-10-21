import { Active } from '@dnd-kit/core'
import { Item } from '../interfaces/item'
import { draggableItems } from '../constants/draggable-items'

export const findactiveItem = (activeItem: Active, items: Item[]) => {
  let item = draggableItems.find((item) => item.id === activeItem.id)

  if (!item && items.length) {
    item = items.find((item) => item.id === activeItem.id)

    if (item) {
      item = {
        ...item,
        icon: activeItem.data.current?.icon,
        title: activeItem.data.current?.title,
      }
    }
  }

  return item
}
