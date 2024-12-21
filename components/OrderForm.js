import { useState } from 'react';
import Input from "@/components/Input";
import Button from "@/components/Button";
import styled from 'styled-components';

const OrderFormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const FormError = styled.div`
  color: red;
  margin-top: 10px;
`;

const OrderForm = ({ form, setForm, goToPayment, error, loading }) => {
  const [formError, setFormError] = useState("");

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

  // Handle auto-fill for form fields (for demo purposes)
  const autoFillFields = () => {
    setForm({
      username: 'John Doe',
      email: 'johndoe@example.com',
      postalCode: '12345',
      billingAddress: '123 Main St',
      country: 'USA',
      creditCard: '4111111111111111',
      cvc: '123',
      shippingAddress: '123 Main St',
    });
  };

  return (
    <OrderFormWrapper>
      <h2>Order Information</h2>
      
      {/* Auto-fill button */}
      <Button block black onClick={autoFillFields}>
        Auto Fill
      </Button>

      {/* Form Fields */}
      <InputWrapper>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleInputChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Postal Code"
          name="postalCode"
          value={form.postalCode}
          onChange={handleInputChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Billing Address"
          name="billingAddress"
          value={form.billingAddress}
          onChange={handleInputChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Country"
          name="country"
          value={form.country}
          onChange={handleInputChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Credit Card Number"
          name="creditCard"
          value={form.creditCard}
          onChange={handleInputChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="CVC"
          name="cvc"
          value={form.cvc}
          onChange={handleInputChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Shipping Address"
          name="shippingAddress"
          value={form.shippingAddress}
          onChange={handleInputChange}
        />
      </InputWrapper>

      {/* Form Error Message */}
      {formError && <FormError>{formError}</FormError>}

      {/* Submit Button */}
      <Button 
        block 
        black 
        onClick={handleSubmit} 
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Continue to Payment'}
      </Button>

      {/* External Error Message */}
      {error && <FormError>{error}</FormError>}
    </OrderFormWrapper>
  );
};

export default OrderForm;
