import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>Macbook Pro</Title>
              <Desc>
                Powerful Performance: The MacBook Pro features cutting-edge
                M-series processors, delivering lightning-fast speeds and
                exceptional efficiency for 
                software development, and 3D rendering. 
              </Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + "676316add776deec1cda541b"}
                  outline={1}
                  white={1}
                >
                  Read more
                </ButtonLink>
                {/* <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button> */}
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src="https://next-ecommerce-bao.s3.ca-central-1.amazonaws.com/1734547126619.png"
              alt=""
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
