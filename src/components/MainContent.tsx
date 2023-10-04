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
        <div className='w-full flex content-margin-right h-screen '>

          <div className=' w-full py-6 px-6 mr-[150px] lg:mr-[350px]'>
            <div className='xl:px-28 py-8 space-y-8 '>
              {PDFSections.map((section, index) => (
                <PDFSection section={section} key={index} droppedElements={filterDroppedElements(section.type)} handleDeleteElement={handleDeleteElement} />
              ))}
            </div>
          </div>

          <Sidebar />

        </div>

        <DragOverlay>
          {activeElement && (<DraggableElementSelector activeElement={activeElement} droppedElements={droppedElements}
            handleDeleteElement={hasSection(activeElement) ? handleDeleteElement : undefined} />)}
        </DragOverlay>

        <Toaster />
      </DndContext>
    </IconContext.Provider>

  )
}

export default MainContent