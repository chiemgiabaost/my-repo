import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import { useUser } from "@/components/UserContext";

// Styled Component for City Input Group
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

// OrderForm Component
const OrderForm = ({ goToPayment, error, loading }) => {
  const { user } = useUser(); // Access the user context
  const [form, setForm] = useState({
    username: "",
    email: "",
    postalCode: "",
    billingAddress: "",
    country: "",
    creditCard: "",
    cvc: "",
    shippingAddress: "",
  });

  const [userData, setUserData] = useState(null); // To store fetched user data
  const [formError, setFormError] = useState("");

  // Fetch user data when the component loads
  useEffect(() => {
    if (user?.username) {
      axios.get(`/api/user?username=${user.username}`).then((res) => {
        setUserData(res.data.user);
      });
    }
  }, [user?.username]);

  // Auto-fill the form fields with fetched user data
  const autoFillFields = () => {
    if (userData) {
      setForm((prev) => ({
        ...prev,
        ...userData,
      }));
    }
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Validate the form before submitting
  const validateForm = () => {
    const requiredFields = [
      "username",
      "email",
      "postalCode",
      "billingAddress",
      "country",
      "creditCard",
      "cvc",
      "shippingAddress",
    ];

    for (let field of requiredFields) {
      if (!form[field]) {
        setFormError(`Please fill in the ${field}.`);
        return false;
      }
    }

    setFormError(""); // Reset the error if everything is valid
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      goToPayment(); // Proceed to payment
    }
  };

  return (
    <div>
      <h2>Order Information</h2>
      <Button block black onClick={autoFillFields}>
        Auto Fill
      </Button>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={handleInputChange}
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
      />
      <CityHolder>
        <Input
          type="text"
          placeholder="Postal Code"
          name="postalCode"
          value={form.postalCode}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          placeholder="Country"
          name="country"
          value={form.country}
          onChange={handleInputChange}
        />
      </CityHolder>
      <Input
        type="text"
        placeholder="Billing Address"
        name="billingAddress"
        value={form.billingAddress}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        placeholder="Shipping Address"
        name="shippingAddress"
        value={form.shippingAddress}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        placeholder="Credit Card"
        name="creditCard"
        value={form.creditCard}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        placeholder="CVC"
        name="cvc"
        value={form.cvc}
        onChange={handleInputChange}
      />
      {formError && <div style={{ color: "red" }}>{formError}</div>}
      <Button black block onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Continue to Payment"}
      </Button>
    </div>
  );
};

export default OrderForm;
