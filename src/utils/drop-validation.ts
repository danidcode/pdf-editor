import { Active, Over } from '@dnd-kit/core'
import { Item } from '../interfaces/item'
import { hasSection } from './has-section'

export const validateDrop = (
  over: Over | null,
  active: Active,
  droppedItems: Item[]
) => {
  return (
    over?.data.current &&
    active.data.current &&
    !droppedItems.some(
      (item) => item.id === active.id && item.section === over?.id
    ) &&
    (over.data.current.accepts || over.data.current.section)
  )
}

const validateReorderedItems = (over: Over | null, active: Active) => {
  return (
    hasSection(active) &&
    over?.data?.current?.forbiddenDestinations &&
    over?.data?.current?.forbiddenDestinations.includes(
      active?.data.current?.section
    )
  )
}

export const validateAllowedItems = (over: Over | null, active: Active) => {
  return (
    over &&
    over?.data?.current?.accepts.includes(active?.data.current?.type) &&
    !validateReorderedItems(over, active)
  )
}
