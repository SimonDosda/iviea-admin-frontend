import {
  PrintfulProductT,
  PrintfulProductWithVariants,
  PrintfulVariantT,
} from "../models/printful";
import { Image, ProductT, VariantT } from "../models/product";
import { getWithToken } from "./api";

export async function getProducts(): Promise<PrintfulProductT[]> {
  return await getWithToken("/printful/products");
}

export async function getProduct(productId: number): Promise<ProductT> {
  const data = await getWithToken<PrintfulProductWithVariants>(`/printful/products/${productId}`);
  return data ? parseProduct(data) : null;
}

function parseProduct({ sync_product, sync_variants }: PrintfulProductWithVariants): ProductT {
  return {
    uid: sync_product.id,
    name: sync_product.name,
    slug: null,
    description: null,
    variants: sync_variants.map(parseVariant),
    images: sync_variants.reduce(
      (images: Image[], variant: PrintfulVariantT, variantIndex: number) => {
        variant.files.forEach(({ preview_url }, fileIndex) => {
          if (images.map(({ url }) => url).indexOf(preview_url) < 0) {
            images.push({
              url: preview_url,
              name: `${sync_product.name}-${variantIndex + 1}${fileIndex + 1}`,
            });
          }
        });
        return images;
      },
      [],
    ),
  };
}

function parseVariant({ id, name, retail_price, sku, product }: PrintfulVariantT): VariantT {
  return {
    uid: id,
    name,
    description: product.name,
    size: "a",
    price: parseFloat(retail_price),
    sku,
  };
}
