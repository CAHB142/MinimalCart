import React from "react";
import styles from "./css/CategoryFilter.module.css";

interface CategoryFilterProps {
  categorias: string[];
  valor: string;
  onChange: (cat: string) => void;
}

export function CategoryFilter({
  categorias,
  valor,
  onChange,
}: CategoryFilterProps) {
  return (
    <div>
      <select value={valor} onChange={(e) => onChange(e.target.value)}>
        {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>{categoria}</option>
        ))}
      </select>
    </div>
  );
}
