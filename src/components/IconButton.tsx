type Props = {
    icon: React.ReactNode
    onClick: () => void
    position?: string
}

const IconButton = ({ icon, onClick, position = 'static' }: Props) => {
    return (
        <button onClick={onClick} className={`bg-transparent hover:bg-gray-200 p-2 rounded-full ${position}`} >
            {icon}
        </button>
    );
};

export default IconButton;