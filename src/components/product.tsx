import React from "react";
import styled from "styled-components";
import { Image, ProductT } from "../models/product";

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
    .cross {
      display: none;
    }
    &:hover .cross {
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
    .arrow {
      display: none;
    }
    &:hover .arrow {
      position: absolute;
      top: -5px;
      right: 20px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      background-color: darkblue;
      color: white;
      padding: 5px;
      border-radius: 100%;

      &:hover {
        cursor: pointer;
      }
    }
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
  img {
    max-height: 80px;
    max-width: 80px;
  }
`;

interface ProductParams {
  product: ProductT;
  removeImage: (image: Image) => void;
  moveImage: (image: Image, displacement: number) => void;
}

const getUrl = ({ url }: Image) => {
  return url.startsWith("/") ? process.env.GATSBY_API_URL + url : url;
};

const Product: React.FC<ProductParams> = ({ product, removeImage, moveImage }) => {
  return (
    <ProductStyles>
      <h2>{product.name}</h2>
      <div className="list">
        {product.images.map((image, index) => (
          <div className="image" key={image.name}>
            <img src={getUrl(image)} />
            {index > 0 && (
              <span className="arrow" onClick={() => moveImage(image, -1)}>
                &lt;
              </span>
            )}
            <span className="cross" onClick={() => removeImage(image)}>
              x
            </span>
          </div>
        ))}
      </div>
      <div className="list">
        {product.variants.length &&
          product.variants.map((variant) => (
            <div className="variant" key={variant.uid}>
              <div>
                {variant.name} : {variant.price} €
              </div>
            </div>
          ))}
      </div>
    </ProductStyles>
  );
};

export default Product;
