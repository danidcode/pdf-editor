import {
  Active,
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useState } from 'react'
import { IconContext } from 'react-icons'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import 'react-hot-toast'
import toast, { Toaster } from 'react-hot-toast'
import { PDFSections } from '../constants/pdf-sections'
import { PDFSectionType } from '../types/pdf-section'
import DraggableElementSelector from './DraggableElementSelector'
import PDFSection from './PDFSection'
import Sidebar from './Sidebar'

import { useDroppedElements } from '../hooks/useDroppedElements'
import { validateAllowedElements, validateDrop } from '../utils/drop-validation'
import { hasSection } from '../utils/has-section'


const MainContent = () => {
  const [activeElement, setActiveElement] = useState<Active | null>(null);
  const { droppedElements, addDroppedElement, deleteDroppedElement } = useDroppedElements();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  )
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, } = event;


    if (validateDrop(over, active, droppedElements)) {
      if (validateAllowedElements(over, active)) {
        addDroppedElement(active, over);
      } else {
        toast.error(`You can not ${hasSection(active) ? 'move' : 'add'} this element here`, {
          position: 'top-center'
        });
      }
    }
  }

  const handleDragStart = ({ active }: DragStartEvent) => {

    setActiveElement(active)
  }

  const filterDroppedElements = (type: PDFSectionType) => {
    const droppedElementsFiltered = droppedElements.filter((element) => element.section === type)
    return droppedElementsFiltered
  }

  const handleDeleteElement = (id: UniqueIdentifier) => {

    deleteDroppedElement(id)
  }


  return (
    <IconContext.Provider value={{ className: "text-secondary" }}>
      <DndContext sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart} >
        <SortableContext
          items={droppedElements}
          strategy={verticalListSortingStrategy}
        >
          <div className='w-full flex  mx-auto h-screen'>

            <div className='w-3/4 py-6 px-6'>
              <div className='px-28 py-8 space-y-8 '>
                {PDFSections.map((section, index) => (
                  <PDFSection section={section} key={index} droppedElements={filterDroppedElements(section.type)} handleDeleteElement={handleDeleteElement} />
                ))}
              </div>
            </div>
            <div className='w-1/4 py-4 px-6 '>
              <Sidebar />
            </div>
          </div>

          <DragOverlay>
            {activeElement && (<DraggableElementSelector activeElement={activeElement} droppedElements={droppedElements}
              handleDeleteElement={hasSection(activeElement) ? handleDeleteElement : undefined} />)}
          </DragOverlay>
        </SortableContext>
        <Toaster />
      </DndContext>
    </IconContext.Provider>

  )
}

export default MainContent