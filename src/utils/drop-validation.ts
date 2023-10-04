import {
    Active,
    Over
  } from '@dnd-kit/core'
import { DraggableElement } from '../interfaces/draggable-element'
import { hasSection } from './has-section'

export const validateDrop = (over: Over | null, active: Active, droppedElements: DraggableElement[]) => {

    return over?.data.current &&
    active.data.current &&
    (!droppedElements.some(
      (element) => element.id === active.id && element.section === over?.id)
    )

}

const validateReorderedElements = (over: Over | null, active: Active) => {
  return hasSection(active)
  && (over?.data?.current?.forbiddenDestinations && over?.data?.current?.forbiddenDestinations.includes(active?.data.current?.section))
}

export const validateAllowedElements = (over: Over | null, active: Active) => {
    return over && over?.data?.current?.accepts.includes(active?.data.current?.type) 
    && !validateReorderedElements(over, active)
}

