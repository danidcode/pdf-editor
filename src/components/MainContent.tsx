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
import ItemSelector from './ItemSelector'
import PDFSection from './PDFSection'
import Sidebar from './Sidebar'


import { validateAllowedItems as validateAllowedItems, validateDrop } from '../utils/drop-validation'
import { hasSection } from '../utils/has-section'
import { useItems } from '../hooks/useItems'


const MainContent = () => {
  const [activeItem, setActiveItem] = useState<Active | null>(null);
  const { items, addItem, deleteItem, reorderItems } = useItems();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  )
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, } = event;


    if (validateDrop(over, active, items)) {
      if (!active?.data?.current?.section) {
        addItem(active, over);
      } else {
        reorderItems(active, over)
      }


    }
  }

  const handleDragStart = ({ active }: DragStartEvent) => {

    setActiveItem(active)
  }

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over?.id || !active?.data?.current?.section) {
      return null
    }
    setActiveItem(active)
    const section = PDFSections.find((section) => section.type === over.id)
    if (section) {
      addItem(active, over, false);
    }

  }

  const filterdroppedItems = (type: PDFSectionType) => {

    const itemsFiltered = items.filter((item) => item.section === type)
    return itemsFiltered
  }

  const handleDeleteItem = (id: UniqueIdentifier) => {

    deleteItem(id)
  }


  return (
    <IconContext.Provider value={{ className: "text-secondary" }}>
      <DndContext sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver} >
        <div className='w-full flex content-margin-right h-screen '>

          <div className=' w-full py-6 px-6 mr-[150px] lg:mr-[350px]'>
            <div className='xl:px-28 py-8 space-y-8 '>
              {PDFSections.map((section, index) => (
                <PDFSection section={section} key={index}
                  droppedItems={filterdroppedItems(section.type)}
                  handleDeleteItem={handleDeleteItem} />
              ))}
            </div>
          </div>

          <Sidebar />

        </div>

        <DragOverlay>
          {activeItem && (<ItemSelector activeItem={activeItem} items={items}
            handleDeleteItem={hasSection(activeItem) ? handleDeleteItem : undefined} />)}
        </DragOverlay>

        <Toaster />
      </DndContext>
    </IconContext.Provider>

  )
}

export default MainContent