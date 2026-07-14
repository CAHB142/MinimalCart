import { createContext, useContext, useState } from "react";
import type { Producto } from "../models/Producto";
import type { CartItem } from "../models/CartItem";

//1.definimos los datos que tendra el carrito
interface CartContextType {
  items: CartItem[];
  addItem: (producto: Producto) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrecio: number;
  decrementItem: (id: number) => void;
}

//2. creamos contexto con un valor inicial vacio

export const CartContext = createContext<CartContextType | null>(null);

//3. creamos el provider (maneja el estado real del carrito)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // A) Agregar un producto al carrito
  // function addItem(producto: Producto) {
  //   setItems((prev) => [...prev, producto]);
  // }
  function addItem(producto: Producto) {
    setItems((prev) => {
      const existe = prev.find((item) => item.producto.id === producto.id);

      if (existe) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prev, { producto: producto, cantidad: 1 }];
    });
  }

  // B) Eliminar por id
  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.producto.id !== id));
  }

  // C) Vaciar carrito
  function clearCart() {
    setItems([]);
  }

  //totalItems
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  //total precio
  const totalPrecio = items.reduce(
    (acc, item) => acc + item.producto.price * item.cantidad,
    0
  );

  function decrementItem(id: number) {
    setItems((prev) => {
      const item = prev.find((p) => p.producto.id === id);
      if (!item) return prev;
      if (item.cantidad === 1) {
        return prev.filter((x) => x.producto.id !== id);
      }

      return prev.map((x) =>
        x.producto.id === id ? { ...x, cantidad: x.cantidad - 1 } : x
      );
    });
  }


  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalItems, totalPrecio, decrementItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

//4. creamos el hook personalizado para construir el contexto

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return context;
}
