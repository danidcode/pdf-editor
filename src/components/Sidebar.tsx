import { draggableElements } from '../constants/draggable-elements';
import DraggableElement from './DraggableElement';

const Sidebar = () => {

    return (
        <div className="fixed top-0 bottom-0 right-0 w-[150px]  lg:w-[350px] overflow-y-auto  p-6 space-y-6 bg-neutral">
            <span className='text-secondary font-inter text-lg '> Elements</span>

            <div className='flex justify-between flex-col lg:flex-row '>

                {draggableElements.map((element) => (
                    <DraggableElement element={element} key={element.id} />
                ))}

            </div>
        </div>

    )
}

export default Sidebar