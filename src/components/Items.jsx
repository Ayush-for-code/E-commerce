import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct,fetchSingleProduct } from "../state/reducers/productSlice";
import { Link } from "react-router-dom";
import Product from "./Product";

const Items = () => {
  const dispatch = useDispatch();

  const { product, loading, error, query, category,singleProduct} = useSelector(
    (state) => state.product
  );
  const getProduct = (id)=>{

  dispatch(fetchSingleProduct(id))
  }
  useEffect(() => {
    dispatch(fetchProduct({ query, category }));
  }, [dispatch, query, category]); // 🔑 re-fetch on search change

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="items">
      {Array.isArray(product) &&product.map((item) => (
      <Link to={`/overview/${item._id}`} className="overview" key={item._id} onClick={()=>{getProduct(item._id)}}> 
       <Product
         
          name={item.name}
          price={item.price}
          description={item.description}
          category={item.category}
          image={item.image}
        /></Link>
      ))}
    </div>
  );
};

export default Items;
