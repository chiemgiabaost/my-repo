import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
