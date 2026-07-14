import { useState } from "react";
import type { Producto } from "./models/Producto";
import { Header } from "./components/Header/Header";
import { ProductGrid } from "./components/ProductGrid/ProductGrid";
import { SkeletonCard } from "./components/SkeletonCard/SkeletonCard";
import { CategoryFilter } from "./components/CategoryFilter/CategoryFilter";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { CartSummary } from "./components/CartSummary/CartSummary";
import { useProductos } from "./hooks/useProductos";
import styles from "./App.module.css";


function App() {
  const { productos, loading, error, recargar } = useProductos();

  const [categoria, setCategoria] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  


  function onSeleccionar(producto: Producto) {
    setProductoSeleccionado(producto);
  }

  //condición ? valor_si_es_true : valor_si_es_false


let productosFiltrados = productos;

  if (categoria !== "all") {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.category === categoria
    );
  }

  if (busqueda.trim() !== "") {
    productosFiltrados = productosFiltrados.filter((producto) =>
      producto.title.toLowerCase().includes(busqueda.trim().toLowerCase())
    );
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
      <CartSummary/>
      {!loading && !error && (
        <>
          <ProductGrid
            productos={productosFiltrados}
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
