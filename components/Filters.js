import React from "react";
import styled from "styled-components";

const FilterWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Filters = ({
  categories,
  onCategoryChange,
  onSearchChange,
}) => {
  return (
    <FilterWrapper>
      <SearchInput
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <FilterSelect onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </FilterSelect>
    </FilterWrapper>
  );
};

export default Filters;
