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
import DraggableItemSelector from './DraggableItemSelector'
import PDFSection from './PDFSection'
import Sidebar from './Sidebar'


import { validateAllowedItems as validateAllowedItems, validateDrop } from '../utils/drop-validation'
import { hasSection } from '../utils/has-section'
import { useDroppedItems } from '../hooks/useDroppedItems'


const MainContent = () => {
  const [activeItem, setactiveItem] = useState<Active | null>(null);
  const { droppedItems, addDroppedItems, deleteDroppedItems } = useDroppedItems();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  )
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, } = event;


    if (validateDrop(over, active, droppedItems)) {
      if (validateAllowedItems(over, active)) {
        addDroppedItems(active, over);
      } else {
        toast.error(`You can not ${hasSection(active) ? 'move' : 'add'} this item here`, {
          position: 'top-center'
        });
      }
    }
  }

  const handleDragStart = ({ active }: DragStartEvent) => {

    setactiveItem(active)
  }

  const filterdroppedItems = (type: PDFSectionType) => {
    const droppedItemsFiltered = droppedItems.filter((item) => item.section === type)
    return droppedItemsFiltered
  }

  const handleDeleteItem = (id: UniqueIdentifier) => {

    deleteDroppedItems(id)
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
                <PDFSection section={section} key={index} droppedItems={filterdroppedItems(section.type)} handleDeleteItem={handleDeleteItem} />
              ))}
            </div>
          </div>

          <Sidebar />

        </div>

        <DragOverlay>
          {activeItem && (<DraggableItemSelector activeItem={activeItem} droppedItems={droppedItems}
            handleDeleteItem={hasSection(activeItem) ? handleDeleteItem : undefined} />)}
        </DragOverlay>

        <Toaster />
      </DndContext>
    </IconContext.Provider>

  )
}

export default MainContent