export type SareeCategory = 
  | 'all'
  | 'kanjeevaram'
  | 'mysore-silk'
  | 'banarasi'
  | 'soft-silk'
  | 'organza'
  | 'chanderi-tussar'
  | 'bridal-festive'
  | 'daily-casual';

export type OccasionType = 'Bridal' | 'Festive & Puja' | 'Reception & Party' | 'Traditional' | 'Office & Daily';

export type ZariType = 'Pure Gold Zari' | 'Tested Zari' | 'Antique Silver Zari' | 'Copper Zari' | 'Thread Work / No Zari';

export interface SareeProduct {
  id: string;
  name: string;
  kannadaName: string;
  code: string; // e.g. NS-8821
  category: SareeCategory;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  fabric: string;
  color: string;
  colorHex: string;
  zariType: ZariType;
  occasion: OccasionType;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isSilkMarkCertified?: boolean;
  images: string[];
  description: string;
  blousePiece: string;
  length: string;
  weaveOrigin: string;
  washCare: string;
  highlights: string[];
  stylingTips?: string;
}

export interface CartItem {
  product: SareeProduct;
  quantity: number;
  selectedColor?: string;
  customNotes?: string;
}

export interface CustomerOrderDetails {
  fullName: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
  preferredContactTime?: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  city: string;
  sareePurchased: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
  sareeCode?: string;
  isVideo?: boolean;
}
