type Props = {
    icon: React.ReactNode
    onClick: () => void

}

const IconButton = ({ icon, onClick }: Props) => {
    return (
        <button onClick={onClick} className="bg-transparent hover:bg-gray-200 p-2 rounded-full">
            {icon}
        </button>
    );
};

export default IconButton;