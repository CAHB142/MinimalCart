import React from "react"
import styles from "./css/Header.module.css"
import { useCart } from "../../context/CartContext"

export function Header(){
const{items} = useCart();
const { totalItems } = useCart();
console.log(items);
    return(
        <div>
            <header className={styles.header}>
                <div>
                    <p className={styles.title}>MinimalCart</p>
                </div>
                <div>
                    <p className={styles.subtitle}>E-commerce minimalista con React + TypeScript</p>
                </div>
                <div>
                    Carrito: {totalItems} producto{totalItems !== 1 ? "s" : ""}
                </div>
            </header>
        </div>
    )
}


