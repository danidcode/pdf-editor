import React from 'react'


type Props = {
    icon: React.ReactNode
    title: string

}

const ItemCard = ({ icon, title }: Props) => {
    return (
        <div className='flex flex-col space-y-1 ' >
            {icon}

            <span className='text-secondary font-inter text-xs text-center'> {title}</span>
        </div>
    )
}

export default ItemCard