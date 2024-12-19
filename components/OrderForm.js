import React from "react";
import styled from "styled-components";
import Input from "@/components/Input";
import Button from "@/components/Button";

// Styled Component for City Input Group
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

// OrderForm Component
const OrderForm = ({ form, handleInputChange, goToPayment, error, loading }) => {
  return (
    <div>
      <h2>Order Information</h2>
      <Input
        type="text"
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
      />
      <CityHolder>
        <Input
          type="text"
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          name="postalCode"
          value={form.postalCode}
          onChange={handleInputChange}
        />
      </CityHolder>
      <Input
        type="text"
        placeholder="Street Address"
        name="streetAddress"
        value={form.streetAddress}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        placeholder="Country"
        name="country"
        value={form.country}
        onChange={handleInputChange}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Button black block onClick={goToPayment} disabled={loading}>
        {loading ? "Processing..." : "Continue to Payment"}
      </Button>
    </div>
  );
};

export default OrderForm;
