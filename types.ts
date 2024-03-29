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

export type ParameterType = {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  value?: string;
};

export type ProductsDocsType = {
  createdAt?: string;
  updatedAt?: string;
  id: string | number;
  categories?: CategoriesType[];
  description?: any;
  colors?: ParameterType[];
  file?: FileType;
  name: string;
  price: string | number;
  sizes?: ParameterType[];
  url: string;
};

export type PaymentOptionsType = {
  createdAt?: string;
  updatedAt?: string;
  id: string;
  name: string;
  price: number;
};

export type CollectionType = {
  docs?: BannersDocsType[] | ProductsDocsType[] | PaymentOptionsType[];
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

export type ContactFormInputs = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  town: string;
};

export type SelectedData = {
  deliveryId: string | null;
  paymentId: string | null;
};

export type SetSelectedData = (
  value: SelectedData | ((prevSelectedData: SelectedData) => SelectedData),
) => void;

export type CartItems = {
  id: string;
  quantity: number;
  selectedSize: string;
  productId: ProductsDocsType;
};
