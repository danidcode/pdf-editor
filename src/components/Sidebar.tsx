import { draggableItems } from '../constants/draggable-items';
import DraggableItem from './DraggableItem';

const Sidebar = () => {

    return (
        <div className="fixed top-0 bottom-0 right-0 w-[150px]  lg:w-[350px] overflow-y-auto  p-6 space-y-6 bg-neutral">
            <span className='text-secondary font-inter text-lg '> Items</span>

            <div className='flex justify-between flex-col lg:flex-row '>

                {draggableItems.map((item) => (
                    <DraggableItem item={item} key={item.id} />
                ))}

            </div>
        </div>

    )
}

export default Sidebar