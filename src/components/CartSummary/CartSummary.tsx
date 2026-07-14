import React from "react";
import styles from './css/CartSumarry.module.css'
import { useCart } from "../../context/CartContext";

export function CartSummary(){
    const {items, addItem, removeItem, clearCart, totalItems, totalPrecio,decrementItem } = useCart();

    if(items.length === 0){
        return <p>Tu carrito esta vacio</p>
    }

    return(
        <div>
            <section>
                <ul>
                    {
                        items.map((item) =>(
                            <li key={item.producto.id}>
                                <div>
                                    <strong>{item.producto.title}</strong>
                                    <p>{item.producto.price}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                    <p>Subtotal: ${item.producto.price * item.cantidad}</p>
                                </div>
                                <div>
                                    <button onClick={()=> {decrementItem(item.producto.id)}}> - </button>
                                    <button onClick={()=> {addItem(item.producto)}}> + </button>
                                    <button onClick={()=> {removeItem(item.producto.id)}}>Eliminar </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                    <hr />
                        <p>Total productos: {totalItems}</p>
                        <p>Total: ${totalPrecio}</p>
                        <button onClick={clearCart}>Vaciar carrito</button>
            </section>
        </div>
    )
}