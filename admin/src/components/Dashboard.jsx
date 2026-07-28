import React from 'react'
import { Link } from 'react-router-dom'
import { useState ,useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getProduct,addProduct } from '../state/reducers/productReducer'
import { ToastContainer, toast, Bounce } from "react-toastify";
import Skeleton from "../components/Skeleton"



const Dashboard = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state)=> state.product)
  const [isOpen,setOpen] = useState(false);
  const [input ,setInput] = useState({name:"",price:"",stock:"",discount:"",image:null,category:"",description:""})
  console.log(input);

  const handleInput = (e)=>{
   const {name,value,files} = e.target;
   setInput((prev)=>({...prev,[name]:files ? files[0]: value}));
  }
  const handleAdd = ()=>{
    
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("name", input.name);
  formData.append("price", input.price);
  formData.append("stock", input.stock);
  formData.append("discount", input.discount);
  formData.append("category", input.category);
  formData.append("description", input.description);
  formData.append("image", input.image);

    dispatch(addProduct(formData));
    setOpen(false);
     const notify = () =>
                    toast.success("successfuly added product", {
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

  }
 useEffect(()=>{
  dispatch(getProduct())
 },[dispatch])
  return (
   <div className='dashboard'>
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
      <h2>Dashboard</h2>
      <p>manage your store efficently</p>
      
    </div>

    <div className="add-product" onClick={()=>setOpen(true)}>
     + Add Product
    </div>
  </div>

  <div className="dashboard-content">

    <div className="recent-orders">
      <h3>Recent Orders</h3>

      <p>orders</p>
      <p>orders</p>
      <p>orders</p>
    </div>

    <div className="top-products">
  <div className='product-header'>
        <h3>Top Products</h3>
      <span className="see-btn">see all</span>
  </div>
    <div className="scroll-area">
            {
        products.map((items)=>(
          <div className="product" key={items._id}>
            <img src={
     items.image[0].startsWith("http")
            ? items.image[0]
            : `${import.meta.env.VITE_RENDERURI}/uploads/${items.image[0]}`
  } alt={items.name} />
            <div><p>name:</p><p>{items && items.name}</p></div>
            <div><p>price:</p> <p>{items && items.price}</p></div>
            <div><p>stock:</p><p>{items && items.stock}</p></div>
             
          </div>
        ))
      }
    </div>
     
    </div>

  </div>
{isOpen && (
  <>
    <div
      className="overlay"
      onClick={() => setOpen(false)}
    ></div>

    <div className="add-modal">
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div
          className="close"
          onClick={() => setOpen(false)}
        >
          
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </div>

        <div className="add-image">
          <h3>Upload Image</h3>
          <input type="file" name="image"  onChange={handleInput}/>
        </div>

        <div className="name">
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter product name"
            name="name"
            value={input.name}
             onChange={handleInput}
          />
        </div>

        <div className="price">
          <p>Price</p>
          <input
            type="text"
            placeholder="Enter price"
            name="price"
            value={input.price}
             onChange={handleInput}
          />
        </div>

        <div className="category">
          <p>Category</p>
          <input
            type="text"
            placeholder="Enter category"
            name="category"
            value={input.category}
             onChange={handleInput}
          />
      </div>
        <div className="stock">
          <p>Stock</p>
          <input
            type="number"
            placeholder="Enter stock quantity"
            name="stock"
            value={input.stock}
             onChange={handleInput}
          />
      </div>

        <div className="discount">
          <p>Discount</p>
          <input
            type="text"
            placeholder="Enter discount %"
            name="discount"
            value={input.discount}
             onChange={handleInput}
          />
        </div>

        <div className="description-field">
          <p>Description</p>
          <textarea
            name="description"
            placeholder="Enter detailed description"
            value={input.description}
             onChange={handleInput}
          ></textarea>
        </div>

        <button type="submit">
          Add Product
        </button>

      </form>
    </div>
  </>
)}
    </div>


  )
}

export default Dashboard
