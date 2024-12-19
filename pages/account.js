import React, { useState, useEffect } from "react";
import { useUser } from "@/components/UserContext"; // If needed, you can use this to get the current user
import axios from "axios";
import styled from "styled-components";
import Button from "@/components/Button"; // Make sure you have a reusable button component
import { useRouter } from "next/router";

// Styled components
const FormWrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FormLabel = styled.label`
  font-weight: bold;
`;

const UserInfoPage = () => {
  const { user, setUser } = useUser(); // Make sure this context provides setUser
    const router = useRouter();
  const [formData, setFormData] = useState({
    billingAddress: "",
    shippingAddress: "",
    postalCode: "",
    creditCard: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state to wait for user data

  // Initialize form data with user data
  useEffect(() => {
    if (user) {
      setFormData({
        billingAddress: user.billingAddress || "",
        shippingAddress: user.shippingAddress || "",
        postalCode: user.postalCode || "",
        creditCard: user.creditCard || "",
        cvc: user.cvc || "",
      });
      setIsLoading(false); // Data is loaded, stop loading
    }
  }, [user]); // Only run when user data is available

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`/api/user?username=${user.username}`, formData);
      if (response.data.success) {
        setSuccess(true);
        setError("");
        setUser(response.data.user); // Update context
        router.push("/"); // Redirect to account page
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error updating user info", error);
      setError(error.response?.data?.error || "An error occurred while updating your information.");
    } finally {
      setLoading(false);
    }
  };

  // If user data is still loading, show loading indicator
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <FormWrapper>
      <h2>Update Your Information</h2>
      {success && <p>Your information has been updated successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <FormLabel>Billing Address</FormLabel>
          <InputField
            type="text"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>Shipping Address</FormLabel>
          <InputField
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>Postal Code</FormLabel>
          <InputField
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>Credit Card</FormLabel>
          <InputField
            type="text"
            name="creditCard"
            value={formData.creditCard}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>CVC</FormLabel>
          <InputField
            type="text"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Info"}
        </Button>
      </form>
    </FormWrapper>
  );
};

export default UserInfoPage;
