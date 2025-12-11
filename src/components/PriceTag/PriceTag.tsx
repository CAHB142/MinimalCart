import React from "react";
import styles from "./css/PriceTag.module.css"

interface PriceTagProps{
    price:number;
}

export function PriceTag({price}:PriceTagProps){
    return(
        <div>
            <p className={styles.priceTag}>${price}</p>
        </div>
    )
}