import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Header from "@/components/Header";
import { UserContext } from "@/components/UserContext"; // Import UserContext

// Styled Components
const FormWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const ToggleLink = styled.p`
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  color: #0070f3;

  &:hover {
    text-decoration: underline;
  }
`;

export default function SignInSignUpPage() {
  const { setUser, setToken } = useContext(UserContext); // Access the setUser and setToken functions from context
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.username || !formData.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      let response;

      if (isSignUp) {
        response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
      } else {
        response = await fetch("/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
      }

      const data = await response.json();

      if (response.ok) {
        // Save JWT token and user data in context
        setToken(data.token); // Store JWT token in context
        setUser(data.user); // Store user data in context
        console.log("User data: ", data.user);
        console.log("Token: ", data.token);
        // Optionally, store the token in memory or use it for further requests
        // You can store the token in sessionStorage or in a more secure memory context

        // Redirect to home page after successful login/signup
        router.push("/");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <FormWrapper>
        <Title>{isSignUp ? "Sign Up" : "Sign In"}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          {isSignUp && (
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          )}

          <Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
        </form>

        <ToggleLink onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </ToggleLink>
      </FormWrapper>
    </>
  );
}
