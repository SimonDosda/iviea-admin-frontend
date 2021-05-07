import axios from "axios";

import {
  PrintfulProductT,
  PrintfulProductWithVariants,
  PrintfulVariantT,
} from "../models/printful";
import { ProductT, VariantT } from "../models/product";

const printfultApi = axios.create({
  baseURL: `${process.env.GATSBY_API_URL}/printful`,
  timeout: 10000,
});

export async function getProducts(): Promise<PrintfulProductT[]> {
  const { status, data } = await printfultApi.get<PrintfulProductT[]>(
    "/products",
  );
  if (status !== 200) {
    console.error(data);
    return [];
  }
  return data;
}

export async function getProduct(productId: number): Promise<ProductT> {
  const { status, data } = await printfultApi.get<PrintfulProductWithVariants>(
    `/products/${productId}`,
  );
  if (status !== 200) {
    console.error(data);
    return null;
  }
  return parseProduct(data);
}

function parseProduct({
  sync_product,
  sync_variants,
}: PrintfulProductWithVariants): ProductT {
  return {
    id: sync_product.id,
    name: sync_product.name,
    variants: sync_variants.map(parseVariant),
    images: sync_variants.reduce((images, variant) => {
      variant.files.forEach(({ preview_url }) => {
        if (images.indexOf(preview_url) < 0) {
          images.push(preview_url);
        }
      });
      return images;
    }, []),
  };
}

function parseVariant({
  id,
  name,
  retail_price,
  sku,
}: PrintfulVariantT): VariantT {
  return {
    id,
    name,
    price: parseFloat(retail_price),
    sku,
  };
}