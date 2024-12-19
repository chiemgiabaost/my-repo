import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { UserProvider } from "@/components/UserContext"; // Import the UserContextProvider

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <UserProvider> {/* Wrap the whole app with both providers */}
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </UserProvider>
    </>
  );
}
