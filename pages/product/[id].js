import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Head from "next/head";
import Footer from "@/components/Footer";
export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  if (!product) {
    return (
      <>
        <Header />
        <Center>
          <p className="text-center text-lg font-medium text-gray-700">
            Product not found.
          </p>
        </Center>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.title} - Product Details</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:image"
          content={product.images[0] || "/placeholder-image.png"}
        />
      </Head>
      <Header />
      <Center>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 py-10">
          {/* Left Column: Images */}
          <div className="bg-white p-6 shadow rounded-md">
            <ProductImages
              images={
                product.images?.length
                  ? product.images
                  : ["/placeholder-image.png"]
              }
            />
          </div>

          {/* Right Column: Product Details */}
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div
              className="text-gray-600 mt-4 text-justify leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>

            {/* Added space between description and price + button */}
            <div className="mt-8 flex items-center justify-between gap-6">
              <span className="text-2xl font-semibold text-gray-900">
                ${product.price}
              </span>

              {/* Added margin to the button for better spacing */}
              <Button
                primary
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md "
                onClick={() => addProduct(product._id)}
              >
                <CartIcon aria-hidden="true" /> Add to cart
              </Button>
            </div>
          </div>
        </div>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: product ? JSON.parse(JSON.stringify(product)) : null,
    },
  };
}
