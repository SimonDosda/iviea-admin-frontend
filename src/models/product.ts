export interface ProductT {
  id: number;
  name: string;
  variants: VariantT[];
  images: string[];
}

export interface VariantT {
  id: number;
  name: string;
  price: number;
  sku: string;
}
