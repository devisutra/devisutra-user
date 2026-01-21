"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. Data Types Define karein
interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from LocalStorage on start (Taki refresh karne par data na ude)
  useEffect(() => {
    const savedCart = localStorage.getItem("deviSutraCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("deviSutraCart", JSON.stringify(cart));
  }, [cart]);

  // Function to Add Item
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      // Check agar product pehle se cart mein hai
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Agar hai, toh bas quantity badha do
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Agar nahi hai, toh naya add karo
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to Decrease Quantity
  const decreaseQuantity = (id: string) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            // Agar quantity 1 se zyada hai, toh kam karo
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            // Agar quantity 1 hai, toh item ko remove kar do
            return null;
          }
          return item;
        })
        .filter((item) => item !== null) as CartItem[];
    });
  };

  // Function to Remove Item
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Total items count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom Hook (Easy to use)
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
