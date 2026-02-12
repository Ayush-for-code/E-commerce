import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../state/reducers/productSlice";
import Product from "./Product";

const Items = () => {
  const dispatch = useDispatch();

  const { product, loading, error, query, category } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProduct({ query, category }));
  }, [dispatch, query, category]); // 🔑 re-fetch on search change

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="items">
      {Array.isArray(product) &&product.map((item) => (
        <Product
          key={item._id}
          name={item.name}
          price={item.price}
          description={item.description}
          category={item.category}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default Items;
