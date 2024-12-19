import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products, isLoading }) {
  // Handle loading and empty state
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-600 col-span-2 md:col-span-4">
        No products match your filters.
      </p>
    );
  }

  // Render filtered products in a grid layout
  return (
    <StyledProductsGrid>
      {products.map((product) => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}
