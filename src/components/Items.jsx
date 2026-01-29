import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const Items = () => {
  const [products, setProducts] = useState([]);

  const handleProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/product/get");

      console.log(res.data);
      setProducts(res.data.products);

    } catch (error) {
      console.error(
        "There is an error fetching data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div className="items">
      {products.map((product) => (
        <Product
          key={product._id}
          name={product.name}
          price={product.price}
          description={product.description}
          category={product.category}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default Items;
