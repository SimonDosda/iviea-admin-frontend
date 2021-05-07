export interface PrintfulProductT {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
}

export interface PrintfulVariantT {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  sku: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  product: Product;
  files?: FilesEntity[] | null;
  options?: OptionsEntity[] | null;
}

export interface PrintfulProductWithVariants {
  sync_product: PrintfulProductT;
  sync_variants: PrintfulVariantT[];
}

interface Product {
  variant_id: number;
  product_id: number;
  image: string;
  name: string;
}

interface FilesEntity {
  id: number;
  type: string;
  hash: string;
  url?: string | null;
  filename: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  dpi?: number | null;
  status: string;
  created: number;
  thumbnail_url: string;
  preview_url: string;
  visible: boolean;
}

interface OptionsEntity {
  id: string;
  value?: string | null[] | null | string | null[] | null;
}
