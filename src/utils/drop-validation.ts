import {
    Active,
    Over
  } from '@dnd-kit/core'
import { DraggableItem } from '../interfaces/draggable-item'
import { hasSection } from './has-section'

export const validateDrop = (over: Over | null, active: Active, droppedItems: DraggableItem[]) => {

    return over?.data.current &&
    active.data.current &&
    (!droppedItems.some(
      (item) => item.id === active.id && item.section === over?.id)
    )

}

const validateReorderedItems = (over: Over | null, active: Active) => {
  return hasSection(active)
  && (over?.data?.current?.forbiddenDestinations && over?.data?.current?.forbiddenDestinations.includes(active?.data.current?.section))
}

export const validateAllowedItems = (over: Over | null, active: Active) => {
    return over && over?.data?.current?.accepts.includes(active?.data.current?.type) 
    && !validateReorderedItems(over, active)
}

