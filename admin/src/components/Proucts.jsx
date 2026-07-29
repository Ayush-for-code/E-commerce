import React, { useState ,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { updateProuduct,getProduct,deleteProduct} from "../state/reducers/productReducer";
import { ToastContainer, toast, Bounce } from "react-toastify";
import SkeletonCard from "./SkeletonCard";

const Products = () => {
  const [edit, setEdit] = useState(false);
  const [id,setId] = useState("");
  const [open , setOpen] = useState(false);

  const [input, setInput] = useState({
    name: "",
    price: "",
    stock: "",
    discount: "",
    image: null,
    category: "",
    description: "",
  });

  const { products,loading } = useSelector((state) => state.product);
  const dispatch = useDispatch()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProuduct({id,updateData:input}))
   await dispatch(getProduct())
    setEdit(false);
    const notify = () =>
                toast.success("successfuly updated", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                });
                notify();
  };
const handleEdit = (item)=>{
  setEdit(true);
  setId(item._id);
  setInput({
    name: item.name,
    price: item.price,
    stock: item.stock,
    discount: item.discount || "",
    image: item.image,
    category: item.category || "",
    description: item.description || "",
  });
}
  const handleInput = (e) => {
    const { name, value, files } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const handleRemove= async(id)=>{
   await dispatch(deleteProduct(id));
   await dispatch(getProduct());
    const notify = () =>
                toast.error("successfuly deleted", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                });
                notify();
   console.log("deleted");
  }


useEffect(()=>{
 dispatch(getProduct())
},[dispatch])

  return (
    <>
      <div className="products-m">
             <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
        <div className="heading">
          <div>
            <h2>Products</h2>
            <p>Manage your products efficiently</p>

            {/* Modal */}
            {edit && (
              <>
                {/* Overlay */}
                <div className={`overlay`} onClick={() => setEdit(false)}></div>
                <div className={`add-modal`}>
                 
                  <form onSubmit={handleSubmit}>
                     <div className="close" onClick={() => setEdit(false)}>
                     
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </div>
                  
                    <div className="add-image">
                      <h3>Upload Image</h3>
                      <input type="file" name="image" onChange={handleInput} />
                    </div>

                    <div className="name">
                      <p>Name</p>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={input.name}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="price">
                      <p>Price</p>
                      <input
                        type="text"
                        name="price"
                        placeholder="Enter price"
                        value={input.price}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="stock">
                      <p>Stock</p>
                      <input
                        type="number"
                        name="stock"
                        placeholder="Enter stock"
                        value={input.stock}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="discount">
                      <p>Discount</p>
                      <input
                        type="text"
                        name="discount"
                        placeholder="Enter discount"
                        value={input.discount}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="category">
                      <p>Category</p>
                      <input
                        type="text"
                        name="category"
                        placeholder="Enter category"
                        value={input.category}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="description-field">
                      <p>Description</p>
                      <textarea
                        name="description"
                        placeholder="Enter description"
                        value={input.description}
                        onChange={handleInput}
                      />
                    </div>

                    <button type="submit">Update Product</button>
                  </form>
                </div>
              </>
            )}
          
          </div>
        </div>
      </div>
        {/* Products */}
            {/* {
              <div className="products">
                <SkeletonCard/>
              </div>
            } */}
           
        {loading ?(
        <div className="products">
          {Array.from({length:6}).map((_,index)=>(
              <SkeletonCard key={index}/>
          ))}
        </div>
            
          
        ) :
              <div className="products">
             
              {products.map((item) => (
                <div className="product" key={item._id}>
                  <div
                    className="edit-icon"
                    onClick={()=>handleEdit(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="#e3e3e3"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                  </div>
                   <div className="delete-icon" onClick={()=>handleRemove(item._id)}>
                        
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                      </div>

                  <img src={
     item.image[0].startsWith("http")
            ? item.image[0]
            : `${import.meta.env.VITE_RENDERURI}/uploads/${item.image[0]}`
  } alt={item.name} />

                  <div>
                    <p>Name:</p>
                    <p>{item.name}</p>
                  </div>

                  <div>
                    <p>Price:</p>
                    <p>{item.price}</p>
                  </div>

                  <div>
                    <p>Stock:</p>
                    <p>{item.stock}</p>
                  </div>
                  
                </div>
              ))}
            </div>
        }
    </>
  );
};

export default Products;
