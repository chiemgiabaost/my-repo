import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Filters from "@/components/Filters";  // Import Filters component
import SortOptions from "@/components/SortOptions";  // Import SortOptions component
import { useState } from "react";
import {Category} from "@/models/Category";  // Import Category model

export default function ProductsPage({ products, categories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  // Filter products based on search term, category, and other filters
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => (categoryFilter ? product.category.toString() === categoryFilter : true));

  // Sort products based on the selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    } else if (sortOption === "price-desc") {
      return b.price - a.price;
    } else if (sortOption === "name-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "name-desc") {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>

        {/* Filters and Search Bar */}
        <Filters
          categories={categories}
          onCategoryChange={setCategoryFilter}
          onSearchChange={setSearchTerm}
        />

        {/* Sort Options */}
        <SortOptions onSortChange={setSortOption} />

        {/* Products Grid with filtered and sorted products */}
        <ProductsGrid products={sortedProducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  // Fetch products with category population
  const products = await Product.find({})
    .populate("category") // Populate the category reference
    .exec();

  // Fetch all categories
  const categories = await Category.find({});

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
