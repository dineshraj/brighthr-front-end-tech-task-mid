import '../styles/SortButton.css';

interface SortButtonProps {
  children: React.ReactNode;
  handleOnClick: (attribute: string) => void;
}

const SortButton = ({ children = '', handleOnClick }: SortButtonProps) => {
  return (
    <button className="sort-button" onClick={() => handleOnClick(children!.toString())}>
      {children}
    </button>
  );
};

export default SortButton;
