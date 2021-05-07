import React from "react";
import styled from "styled-components";
import { ProductT } from "../models/product";

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 300px 400px 1fr;
  margin: 20px;
  .list {
    display: flex;
    align-items: center;
  }
  .image {
    position: relative;
  }
  .variant {
    position: relative;
    background-color: burlywood;
    color: white;
    font-weight: bold;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 25px;
  }
  .cross {
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    background-color: darkred;
    color: white;
    padding: 5px;
    border-radius: 100%;

    &:hover {
      cursor: pointer;
    }
  }
  img {
    max-height: 80px;
    max-width: 80px;
  }
`;

interface ProductParams {
  product: ProductT;
  removeImage: (src: string) => void;
}

const Product: React.FC<ProductParams> = ({ product, removeImage }) => {
  return (
    <ProductStyles>
      <h2>{product.name}</h2>
      <div className="list">
        {product.images.map((src) => (
          <div className="image">
            <img key={src} src={src} />
            <span className="cross" onClick={() => removeImage(src)}>
              x
            </span>
          </div>
        ))}
      </div>
      <div className="list">
        {product.variants.length &&
          product.variants.map((variant) => (
            <div className="variant">
              <div key={variant.id}>
                {variant.name} : {variant.price} €
              </div>
            </div>
          ))}
      </div>
    </ProductStyles>
  );
};

export default Product;
