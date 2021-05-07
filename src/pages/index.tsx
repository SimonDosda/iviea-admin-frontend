import React, { useState } from "react";
import { PageProps, graphql } from "gatsby";

import { getProduct, getProducts } from "../services/printful";
import { ProductT } from "../models/product";
import Layout from "../components/layout";

interface DataProps {
  products: {
    nodes: {
      strapiId;
      name;
      description;
    }[];
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

  return (
    <Layout>
      <ul>
        {data.products.nodes.map((product) => (
          <li key={product.strapiId}>{product.name}</li>
        ))}
      </ul>
      <button onClick={fetchProducts}>Fetch</button>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          {product.images.map((src) => (
            <img key={src} src={src} />
          ))}
          {product.variants.length &&
            product.variants.map((variant) => (
              <div key={variant.id}>
                {variant.name} - {variant.price} €
              </div>
            ))}
        </div>
      ))}
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    products: allStrapiProduct {
      nodes {
        strapiId
        name
        description
      }
    }
  }
`;
