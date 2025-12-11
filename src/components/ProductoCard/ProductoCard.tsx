import type { Producto } from "../../models/Producto";
import styles from "./css/ProductoCard.module.css";
import { PriceTag } from "../PriceTag/PriceTag";
import { useCart } from "../../context/CartContext";

interface ProductoCardProps {
  producto: Producto;
  onSeleccionar: (p: Producto) => void;
}

function ProductoCard({ producto,onSeleccionar }: ProductoCardProps) {
  const{addItem} = useCart();

  return (
    <article className={styles.card}>
      <img src={producto.image} alt={producto.title} className={styles.img} />

      <h2 className={styles.title}>{producto.title}</h2>

      <p className={styles.price}>
        <PriceTag price={producto.price} />
      </p>

      <p className={styles.category}>{producto.category}</p>

      <button
        type="button"
        onClick={() => onSeleccionar(producto)} 
      >
        Ver detalles
      </button>

      <button 
        type="button"
        onClick={() => addItem(producto)}
      >
        Agregar al carrito
      </button>
    </article>
  );
}

export { ProductoCard };
