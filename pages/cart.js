import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState, useMemo } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import OrderForm from "@/components/OrderForm";
import { useRouter } from "next/router";
import { useUser } from "@/components/UserContext"; // Import the useUser hook

// Styled Components
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const SignInPrompt = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

// Function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// Component
export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const { user, token } = useUser(); // Use the useUser hook to get the user and token from context
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state for checkout
  const router = useRouter();

  // Fetch product details for items in the cart
  useEffect(() => {
    if (cartProducts.length > 0) {
      setLoading(true);
      axios.post("/api/cart", { ids: cartProducts })
        .then((response) => setProducts(response.data))
        .catch((error) => {
          console.error("Error fetching cart products:", error);
          setError("Could not load cart items. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cartProducts]);  // Make sure it re-fetches when cart changes
  
  // Check for successful orders in the URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);

  // Handle input changes in the order form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate the total price
  const calculateTotal = useMemo(() => {
    return cartProducts.reduce((sum, productId) => {
      const product = products.find((p) => p._id === productId);
      return sum + (product?.price || 0);
    }, 0);
  }, [cartProducts, products]);

  // Handle adding more of a product
  const handleAddProduct = (id) => addProduct(id);

  // Handle removing a product
  const handleRemoveProduct = (id) => removeProduct(id);

  // Validate form
  const validateForm = () => {
    const requiredFields = [
      "name",
      "email",
      "city",
      "postalCode",
      "streetAddress",
      "country",
    ];
    for (let field of requiredFields) {
      if (!form[field]) {
        setError(`Please fill in the ${field}.`);
        return false;
      }
    }
    setError("");
    return true;
  };

  // Handle payment process
  const goToPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/checkout", {
        ...form,
        cartProducts,
        products,
      });

      if (response.data.success) {
        setIsSuccess(true);
        clearCart();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("An error occurred during payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If the user is not authenticated, show a prompt to sign in
  if (!user || !token) { // Use `user` and `token` from the context
    return (
      <>
        <Header />
        <Center>
          <SignInPrompt>
            <h2>Please sign in to proceed with your order</h2>
            <Button onClick={() => router.push("/signin")}>Sign In</Button>
          </SignInPrompt>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          {/* Cart Section */}
          <Box>
            <h2>Cart</h2>
            {!cartProducts.length && <div>Your cart is empty</div>}
            {loading && <div>Loading cart items...</div>}
            {products.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const quantityInCart = cartProducts.filter(
                      (id) => id === product._id
                    ).length;
                    return (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt={product.title} />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => handleRemoveProduct(product._id)}
                            disabled={quantityInCart <= 0}
                          >
                            -
                          </Button>
                          <QuantityLabel>{quantityInCart}</QuantityLabel>
                          <Button
                            onClick={() => handleAddProduct(product._id)}
                            disabled={quantityInCart >= product.quantity} // Disable if the cart quantity exceeds stock
                          >
                            +
                          </Button>
                          <p>Stock: {product.quantity}</p>
                        </td>
                        <td>{formatPrice(quantityInCart * product.price)}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{formatPrice(calculateTotal)}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {/* Order Form Section */}
          {!!cartProducts.length && (
            <Box>
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
            </Box>
          )}
        </ColumnsWrapper>
        {isSuccess && (
          <Box>
            <h1>Thanks for your order!</h1>
            <p>We will email you when your order is shipped.</p>
            <p>Your order has been successfully placed.</p>
          </Box>
        )}
      </Center>
    </>
  );
}
