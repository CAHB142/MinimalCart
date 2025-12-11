const API_URL = "https://fakestoreapi.com/products";
import type { Producto } from "../models/Producto";


export async function obtenerProductos(): Promise<Producto[]> {
  try {
    //1.hacer una peticion a una tarea asincrona
    const resp = await fetch("https://fakestoreapi.com/products");
    //2.Validar errores
    if (!resp.ok) {
      throw new Error("Error en la peticion");
    }
    //3.procesar datos
    const data = await resp.json();
    //4.devolver lo necesario
    
    const productos: Producto[] = data.map((item:any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
    }));

    return productos;
  } catch (error) {
    //5.manejar errores
    console.error("Hubo un error");
    throw error; //volver a lanzar si quieres que lo manaje otra parte
  }
}
