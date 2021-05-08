export interface ProductT {
  uid: number;
  name: string;
  slug: string;
  description: string;
  variants: VariantT[];
  images: Image[];
}

export interface VariantT {
  uid: number;
  name: string;
  price: number;
  sku: string;
  description: string;
  size: string;
}

export interface Image {
  name;
  url;
}
