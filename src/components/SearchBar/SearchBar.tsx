import React from "react";
import styles from "./css/SearchBar.module.css";

interface SearchBarProps {
  valor: string;
  onChange: (inp: string) => void;
}

export function SearchBar({ valor, onChange }: SearchBarProps) {
  return (
    <div>
      <input
        placeholder="Buscar producto..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
