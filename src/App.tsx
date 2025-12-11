import type { Producto } from "./models/Producto";
import { Header } from "./components/Header/Header";
import { ProductGrid } from "./components/ProductGrid/ProductGrid";
import { useState, useEffect } from "react";
import { obtenerProductos } from "./services/productosService";
import { SkeletonCard } from "./components/SkeletonCard/SkeletonCard";
import { CategoryFilter } from "./components/CategoryFilter/CategoryFilter";
import { SearchBar } from "./components/SearchBar/SearchBar";
import styles from "./App.module.css";

// const productMock:Producto ={
//   id:1,
//   title:'camiseta',
//   price:50000,
//   description:"camiseta de algodon",
//   category:'ropa',
//   image:'/assets/camiseta.jpg'
// }

// const producto1:Producto ={
//     id:1,
//     title:'zapatos',
//     price:50,
//     description:'zapatillas',
//     category:'zapatos',
//     image:''
// }
// const producto2:Producto ={
//     id:1,
//     title:'calzoncillos',
//     price:50,
//     description:'ropa interior de microfibra',
//     category:'ropa interior',
//     image:''
// }
// const producto3:Producto ={
//     id:3,
//     title:'collar',
//     price:50,
//     description:'collar de perlas',
//     category:'joyeria',
//     image:''
// }

// const arrayProducto:Producto[] =[productMock,producto1,producto2,producto3]

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoria, setCategoria] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  function onSeleccionar(producto: Producto) {
    setProductoSeleccionado(producto);
  }

  //condición ? valor_si_es_true : valor_si_es_false
  const filtrarProductos =
    categoria === "all"
      ? productos
      : productos.filter((p) => p.category === categoria);

  let resultadoBusqueda = productos;

  if (categoria !== "all") {
    resultadoBusqueda = resultadoBusqueda.filter(
      (p) => p.category == categoria
    );
  }

  if (busqueda.trim() !== "") {
    resultadoBusqueda = resultadoBusqueda.filter((p) =>
      p.title.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  async function cargarProductos() {
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
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  function recargar() {
    cargarProductos();
  }

  return (
    <main >
      <Header />
      <button onClick={recargar}>Recargar productos</button>
      <CategoryFilter
        categorias={[
          "all",
          "men's clothing",
          "women's clothing",
          "jewelery",
          "electronics",
        ]}
        valor={categoria}
        onChange={setCategoria}
      />

      <SearchBar valor={busqueda} onChange={setBusqueda}/>
      
      {/* <input
        placeholder="Buscar producto..."
        onChange={(e) => setBusqueda(e.target.value)}
      /> */}
      {loading && (
        <div className={styles.contenedor}>
          <div className={styles.grid}>
            <div className={styles.div1}>
              <SkeletonCard />
            </div>
            <div className={styles.div1}>
              <SkeletonCard />
            </div>
            <div className={styles.div2}>
              <SkeletonCard />
            </div>
            <div className={styles.div3}>
              <SkeletonCard />
            </div>
            <div className={styles.div4}>
              <SkeletonCard />
            </div>
            <div className={styles.div5}>
              <SkeletonCard />
            </div>
            <div className={styles.div6}>
              <SkeletonCard />
            </div>
            <div className={styles.div7}>
              <SkeletonCard />
            </div>
            <div className={styles.div8}>
              <SkeletonCard />
            </div>
            <div className={styles.div9}>
              <SkeletonCard />
            </div>
            <div className={styles.div10}>
              <SkeletonCard />
            </div>
            <div className={styles.div11}>
              <SkeletonCard />
            </div>
            <div className={styles.div12}>
              <SkeletonCard />
            </div>
          </div>
        </div>
      )}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <ProductGrid
            productos={resultadoBusqueda}
            onSeleccionar={onSeleccionar}
          />

          {productoSeleccionado && (
            <section
              style={{
                marginTop: "24px",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "white",
                maxWidth: "600px",
              }}
            >
              <h2>{productoSeleccionado.title}</h2>
              <img
                src={productoSeleccionado.image}
                alt={productoSeleccionado.title}
                style={{ width: "150px", borderRadius: "8px" }}
              />
              <p>{productoSeleccionado.description}</p>
              <p>
                <strong>Categoría:</strong> {productoSeleccionado.category}
              </p>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default App;
