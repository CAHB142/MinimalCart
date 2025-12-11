import React from "react";
import styles from "./css/SkeletonCard.module.css";

export function SkeletonCard() {
  return (
    <div>
      <article className={styles.card}>
        <img  className={styles.img} />

        <h2 className={styles.title}> </h2>

        <p className={styles.price}>
          
        </p>

        <p className={styles.category}></p>
      </article>
    </div>
  );
}
