import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, SareeProduct, CustomerOrderDetails } from '../types';
import { SAREE_PRODUCTS } from '../data/sarees';

interface CartContextType {
  cart: CartItem[];
  wishlist: SareeProduct[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutModalOpen: boolean;
  isAiStylistOpen: boolean;
  selectedQuickViewProduct: SareeProduct | null;
  searchQuery: string;
  selectedCategory: string;
  selectedOccasion: string;
  selectedZari: string;
  priceRange: [number, number];
  sortBy: string;
  customerDetails: CustomerOrderDetails;
  couponCode: string;
  discountAmount: number;
  
  // Actions
  addToCart: (product: SareeProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: SareeProduct) => void;
  isInWishlist: (productId: string) => boolean;
  
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsCheckoutModalOpen: (open: boolean) => void;
  setIsAiStylistOpen: (open: boolean) => void;
  setSelectedQuickViewProduct: (product: SareeProduct | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedOccasion: (occasion: string) => void;
  setSelectedZari: (zari: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: string) => void;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerOrderDetails>>;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Calculations
  cartTotalCount: number;
  cartSubtotal: number;
  cartFinalTotal: number;
  wishlistTotalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DEFAULT_CUSTOMER_DETAILS: CustomerOrderDetails = {
  fullName: '',
  phoneNumber: '',
  altPhoneNumber: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  city: '',
  state: 'Karnataka',
  pincode: '',
  orderNotes: '',
  preferredContactTime: 'Anytime (10 AM - 8 PM)'
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('neere_seere_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<SareeProduct[]>(() => {
    try {
      const saved = localStorage.getItem('neere_seere_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer shipping details with localStorage
  const [customerDetails, setCustomerDetails] = useState<CustomerOrderDetails>(() => {
    try {
      const saved = localStorage.getItem('neere_seere_customer');
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER_DETAILS;
    } catch {
      return DEFAULT_CUSTOMER_DETAILS;
    }
  });

  // Modals & Panels State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAiStylistOpen, setIsAiStylistOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<SareeProduct | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [selectedZari, setSelectedZari] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 30000]);
  const [sortBy, setSortBy] = useState('featured');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('neere_seere_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('neere_seere_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('neere_seere_customer', JSON.stringify(customerDetails));
    } catch (e) {
      console.error('Failed to save customer details', e);
    }
  }, [customerDetails]);

  // Cart operations
  const addToCart = (product: SareeProduct, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountAmount(0);
  };

  // Wishlist operations
  const toggleWishlist = (product: SareeProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NEERE10' || cleanCode === 'FESTIVE10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setCouponCode(cleanCode);
      setDiscountAmount(discount);
      return { success: true, message: `10% Festive Discount of ₹${discount.toLocaleString('en-IN')} applied!` };
    } else if (cleanCode === 'SILK500' && cartSubtotal >= 5000) {
      setCouponCode(cleanCode);
      setDiscountAmount(500);
      return { success: true, message: '₹500 Silk Special discount applied!' };
    } else if (cleanCode === 'SILK500' && cartSubtotal < 5000) {
      return { success: false, message: 'SILK500 requires a minimum order of ₹5,000' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try NEERE10 or SILK500' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountAmount(0);
  };

  // Totals
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount);
  const wishlistTotalCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isCheckoutModalOpen,
        isAiStylistOpen,
        selectedQuickViewProduct,
        searchQuery,
        selectedCategory,
        selectedOccasion,
        selectedZari,
        priceRange,
        sortBy,
        customerDetails,
        couponCode,
        discountAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutModalOpen,
        setIsAiStylistOpen,
        setSelectedQuickViewProduct,
        setSearchQuery,
        setSelectedCategory,
        setSelectedOccasion,
        setSelectedZari,
        setPriceRange,
        setSortBy,
        setCustomerDetails,
        applyCoupon,
        removeCoupon,
        cartTotalCount,
        cartSubtotal,
        cartFinalTotal,
        wishlistTotalCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
