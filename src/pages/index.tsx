import React, { useState } from "react";
import { PageProps, graphql } from "gatsby";

import { getProducts, getProduct } from "../services/printful";
import { ProductT } from "../models/product";
import Layout from "../components/layout";
import Product from "../components/product";

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
        <Product key={product.id} product={product} />
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
