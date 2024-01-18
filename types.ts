export type CategoriesType = {
  createdAt?: string;
  updatedAt?: string;
  id: string | number;
  title?: string;
  url?: string;
};

export type CustomLinksType = {
  createdAt?: string;
  updatedAt?: string;
  id: string | number;
  label?: string;
  url?: string;
};

export type HeaderType = {
  categories: CategoriesType[];
  customLinks?: CustomLinksType[];
  createdAt?: string;
  id: string | number;
  updatedAt?: string;
  globalType: string;
};

type CloudinaryImageType = {
  format: string;
  original_filename: string;
  public_id: string;
  resource_type: string;
  secure_url: string;
};

type FileType = {
  alt: string;
  cloudinary: CloudinaryImageType;
  created_at: string;
  filename: string;
  filesize: number;
  height: number;
  id: string;
  mimeType: string;
  original_doc: {
    url: string;
  };
  url?: string;
  sizes?: {
    card: { width: number; height: number; mime_type: string; filesize: number; filename: string };
    tablet: {
      width: number;
      height: number;
      mime_type: string;
      filesize: number;
      filename: string;
    };
    thumbnail: {
      width: number;
      height: number;
      mime_type: string;
      filesize: number;
      filename: string;
    };
  };
};

export type BannersDocsType = {
  createdAt?: string;
  updatedAt?: string;
  id: string | number;
  location?: string;
  url?: string;
  file: FileType;
};

export type ColorType = {
  color: string;
  id: string | number;
};

export type SizeType = {
  size: string;
  id: string | number;
};

export type ProductsDocsType = {
  createdAt?: string;
  updatedAt?: string;
  id: string | number;
  categories?: CategoriesType[];
  description?: any;
  colors?: ColorType[];
  file?: FileType;
  name: string;
  price: string | number;
  sizes?: SizeType[];
  url: string;
};

export type CollectionType = {
  docs?: BannersDocsType[] | ProductsDocsType[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: null | number;
  page: number;
  pagingCounter: number;
  prevPage: null | number;
  totalDocs: number;
  totalPages: number;
};
