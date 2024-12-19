import React from "react";
import styled from "styled-components";

const SortWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const SortSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const SortOptions = ({ onSortChange }) => {
  return (
    <SortWrapper>
      <SortSelect onChange={(e) => onSortChange(e.target.value)}>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </SortSelect>
    </SortWrapper>
  );
};

export default SortOptions;
