import SortButton from "./SortButton"

interface SortProps {
  sortBy: (attribute: string) => void;

}

const Sort = ({ sortBy }: SortProps) => {
  return (
    <div className="sort">
      <span className="sort__text">Sort by:</span>
      <SortButton handleOnClick={sortBy}>Date</SortButton>
      <SortButton handleOnClick={sortBy}>Name</SortButton>
      <SortButton handleOnClick={sortBy}>Size</SortButton>
      <SortButton handleOnClick={() => sortBy('')}>Reset</SortButton>
    </div>
  )
};

export default Sort;