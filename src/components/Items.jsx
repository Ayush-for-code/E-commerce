import { useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct,fetchSingleProduct } from "../state/reducers/productSlice";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component"
import Product from "./Product";
import SkeletonCard from "./SkeletonCard";
import { useAuth } from "@clerk/react"; 

const Items = () => {
  const dispatch = useDispatch();
  const {isLoaded,isSignedIn,getToken} = useAuth()

  const { product, loading, error, query, category,hasMore} = useSelector(
    (state) => state.product
  );
  const [page , setpage] = useState(1)
  const getProduct = (id)=>{

  dispatch(fetchSingleProduct(id))
  }
   const fetchMoreData = () => {
    const nextPage = page + 1;
    dispatch(fetchProduct({page: nextPage}));
   setpage(nextPage);
  };
  useEffect(() => {
    setpage(1)
    dispatch(fetchProduct({page:1}));
  }, [dispatch, query, category]); // 🔑 re-fetch on search change

 useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      console.log("User is NOT logged in");
      return;
    }

    console.log("User IS logged in");
  }, [isLoaded, isSignedIn]);

  // =========================
  // Get Clerk token
  // Only needed when calling
  // protected backend routes
  // =========================
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    const getUserToken = async () => {
      try {
        const token = await getToken();

        console.log(
          "Clerk token:",
          token ? "TOKEN RECEIVED" : "NO TOKEN"
        );
      } catch (error) {
        console.error("Error getting Clerk token:", error);
      }
    };

    getUserToken();
  }, [isLoaded, isSignedIn, getToken]);
  
  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
    {loading && page === 1 ? (
      <div className="items">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    ) : (
      <InfiniteScroll
        dataLength={product.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<SkeletonCard />}
      >
        <div className="items">
          {product.map((item) => (
            <Link
              key={item._id}
              to={`/overview/${item._id}`}
              className="overview"
              onClick={() => getProduct(item._id)}
            >
              <Product
                name={item.name}
                price={item.price}
                description={  item.description.length > 35
    ? item.description.slice(0, 35) + "..."
    : item.description}
                category={item.category}
                image={
                  item.image[0].startsWith("http")
                    ? item.image[0]
                    : `${import.meta.env.VITE_RENDERURI}/uploads/${item.image[0]}`
                }
              />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    )}
    
    </>
    
  );
};

export default Items;
