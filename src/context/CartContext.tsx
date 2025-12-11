import React, { createContext, useContext, useState } from "react";
import type { Producto } from "../models/Producto";

//1.definimos los datos que tendra el carrito
interface CartContextType {
  items: Producto[];
  addItem: (producto: Producto) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

//2. creamos contexto con un valor inicial vacio

export const CartContext = createContext<CartContextType | null>(null);

//3. creamos el provider (maneja el estado real del carrito)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Producto[]>([]);

  // A) Agregar un producto al carrito
  function addItem(producto: Producto) {
    setItems((prev) => [...prev, producto]);
  }

  // B) Eliminar por id
  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  // C) Vaciar carrito
  function clearCart() {
    setItems([]);
  }

  return(
    <CartContext.Provider value={{ items,addItem,removeItem,clearCart}}>
        {children}
    </CartContext.Provider>
  )
}

//4. creamos el hook personalizado para construir el contexto

export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart debe usarse dentro de <CartProvider>");
    }
    return context;
}