import { useState } from "react";
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
export const FilterControls = ({ applyFilters, clearFilters }) => {
  const [category, setCategory] = useState("");
  const [costRange, setCostRange] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");

  const handleApplyFilters = () => {
    const filters = {
      category,
      costRange,
      country,
      location,
    };

    applyFilters(filters);
  };

  const handleClear = () => {
    setCategory("");
    setCostRange("");
    setCountry("");
    setLocation("");
    clearFilters();
  };

  return (
    <Container>
      <div className="containerSelect">
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="selectClass"
        >
          <option value="">Select Category</option>
          <option value="Books">Books</option>
          <option value="Electronic Devices">Electronic Devices</option>
          <option value="Lab Equipment">Lab Equipment</option>
          <option value="Stationery">Stationery</option>
        </Select>

        <Select
          value={costRange}
          onChange={(e) => setCostRange(e.target.value)}
          className="selectClass"
        >
          <option value="">Select Cost Range</option>
          <option value="1-50">$1 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-500">$100 - $500</option>
          <option value="500-1000">$500 - $1000</option>
        </Select>

        {/* <Input
          type="text"
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="inputClass"
        />

        <Input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="inputClass"
        /> */}
      </div>
      <div className="containerBtn">
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
        <Button onClick={handleClear}>Clear Filters</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 20px auto;

  padding: 10px 10px;
  flex-direction: column;
  .selectClass {
    border: 1px solid gray;
    padding: 4px;
    border-radius: 4px;
  }
  .inputClass {
    border: 1px solid gray;
    padding: 4px;
    border-radius: 4px;
  }

  .containerSelect {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .containerBtn {
    display: flex;
    width: 100%;
    justify-content: end;
    padding-top: 10px;


  }
`;

const Select = styled.select`
  margin-right: 10px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px;
`;
