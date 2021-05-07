import React from "react";
import styled from "styled-components";
import { ProductT } from "../models/product";

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 1fr;
  margin: 10px;
  .images {
    display: flex;
    height: 80px;
  }
  img {
    max-height: 100%;
  }
`;

const Product: React.FC<{ product: ProductT }> = ({ product }) => {
  return (
    <ProductStyles>
      <h2>{product.name}</h2>
      <div className="images">
        {product.images.map((src) => (
          <img key={src} src={src} />
        ))}
      </div>
      <div>
        {product.variants.length &&
          product.variants.map((variant) => (
            <div key={variant.id}>
              {variant.name} - {variant.price} €
            </div>
          ))}
      </div>
    </ProductStyles>
  );
};

export default Product;
