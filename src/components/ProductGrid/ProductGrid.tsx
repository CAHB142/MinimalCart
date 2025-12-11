import React from "react";
import styles from "./css/ProductGrid.module.css";
import { ProductoCard } from "../ProductoCard/ProductoCard";
import type { Producto } from "../../models/Producto";

interface ProductGridProps {
  productos: Producto[];
  onSeleccionar : (p:Producto) => void
}

export function ProductGrid({ productos,onSeleccionar }: ProductGridProps  ) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedorProductos}>
        <div className={styles.card}>
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} onSeleccionar={onSeleccionar} />
          ))}
        </div>
      </div>
    </div>
  );
}
