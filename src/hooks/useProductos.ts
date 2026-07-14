import { useEffect,useState,useCallback } from "react";
import type { Producto } from "../models/Producto";
import { obtenerProductos } from "../services/productosService";


export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      setError("No se pudieron cargar los productos. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { productos, loading, error, recargar };
}