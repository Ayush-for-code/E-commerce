import { useState } from "react";
import Hero from "../components/Hero";
import Filter from "../components/Filter";
import products from "../data/products";

function Home() {
  const [category, setCategory] = useState("all");

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

  return (
    <>
      <Hero />
      <Filter setCategory={setCategory} />

      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
