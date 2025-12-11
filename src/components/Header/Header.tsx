import React from "react"
import styles from "./css/Header.module.css"

export function Header(){
    return(
        <div>
            <header className={styles.header}>
                <div>
                    <p className={styles.title}>MinimalCart</p>
                </div>
                <div>
                    <p className={styles.subtitle}>E-commerce minimalista con React + TypeScript</p>
                </div>
            </header>
        </div>
    )
}


