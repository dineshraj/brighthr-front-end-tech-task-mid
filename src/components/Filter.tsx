import { ChangeEventHandler } from "react";

import '../styles/Filter.css';

interface FilterProps {
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
  filter: string;
}

const Filter = ({ handleOnChange, filter }: FilterProps) => {
  return (
    <>
      <span className="sort__text">Filter:</span>
      <input
        className="filter"
        value={filter}
        data-testid="filter"
        onChange={handleOnChange}
      />
    </>
  );
};

export default Filter;