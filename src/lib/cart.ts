import { useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  size?: string;
};

const CART_KEY = "rudvi-cart";
const CART_EVENT = "rudvi-cart-updated";

const readCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(CART_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeCart = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
};

export const cartTotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.qty, 0);

export const cartCount = (items: CartItem[]) => items.reduce((total, item) => total + item.qty, 0);

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());

    const sync = () => setItems(readCart());
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return useMemo(
    () => ({
      items,
      count: cartCount(items),
      total: cartTotal(items),
      addItem: (item: CartItem) => {
        const next = readCart();
        const key = `${item.id}:${item.size ?? ""}`;
        const existing = next.find((cartItem) => `${cartItem.id}:${cartItem.size ?? ""}` === key);

        if (existing) {
          existing.qty += item.qty;
        } else {
          next.push(item);
        }

        writeCart(next);
      },
      updateQty: (id: string, size: string | undefined, qty: number) => {
        const next = readCart()
          .map((item) => (item.id === id && item.size === size ? { ...item, qty } : item))
          .filter((item) => item.qty > 0);
        writeCart(next);
      },
      removeItem: (id: string, size?: string) => {
        writeCart(readCart().filter((item) => !(item.id === id && item.size === size)));
      },
      clearCart: () => writeCart([]),
    }),
    [items],
  );
}
