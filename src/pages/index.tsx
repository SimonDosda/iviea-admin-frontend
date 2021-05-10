import React, { useState } from "react";
import { PageProps, graphql } from "gatsby";

import { getProduct, getProducts } from "../services/printful";
import { Image, ProductT } from "../models/product";
import Layout from "../components/layout";
import Product from "../components/product";

interface DataProps {
  products: {
    nodes: ProductT[];
  };
}

const IndexPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const fetchProducts = async () => {
    let allProducts: ProductT[] = [];
    const printfulProducts = await getProducts();
    for (let i = 0; i < printfulProducts.length; i++) {
      const product = await getProduct(printfulProducts[i].id);
      if (product) {
        allProducts = [...allProducts, product];
        setProducts(allProducts);
      }
    }
  };
  const removeImage = ({ uid }: ProductT) => {
    const removeProductImage = ({ url }: Image) =>
      setProducts([
        ...products.map((product) => {
          if (product.uid !== uid) {
            return product;
          }
          return { ...product, images: product.images.filter((image) => image.url !== url) };
        }),
      ]);
    return removeProductImage;
  };

  const moveImage = ({ uid }: ProductT) => {
    const moveProductImage = ({ url }: Image, displacement: number) =>
      setProducts([
        ...products.map((product) => {
          if (product.uid !== uid) {
            return product;
          }
          const index = product.images.findIndex((image) => image.url !== url);
          const images = [...product.images];
          const image = images.splice(index + displacement, 1);
          images.splice(index, 0, image[0]);
          return { ...product, images };
        }),
      ]);
    return moveProductImage;
  };

  return (
    <Layout>
      {data.products.nodes.map((product) => (
        <Product
          key={product.uid}
          product={product}
          removeImage={removeImage(product)}
          moveImage={moveImage(product)}
        />
      ))}
      <button onClick={fetchProducts}>Fetch</button>
      {products.map((product) => (
        <Product
          key={product.uid}
          product={product}
          removeImage={removeImage(product)}
          moveImage={moveImage(product)}
        />
      ))}
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    products: allStrapiProduct {
      nodes {
        uid
        name
        slug
        description
        images {
          name
          url
        }
        variants {
          uid
          name
          sku
          description
          size
          price
        }
      }
    }
  }
`;
