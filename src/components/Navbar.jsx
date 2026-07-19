import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setQuery } from "../state/reducers/productSlice";




function Navbar(props) {

const [input,setinput] = useState("")
const navigate = useNavigate();

const query = useSelector(state=>state.query)
  const [activeMenu, setActiveMenu] = useState(null)

const dispatch = useDispatch();
const logOut = ()=>{
  localStorage.removeItem("auth-token");
  navigate("/login")
}

const handleSubmit = (e)=>{
  e.preventDefault()
  dispatch(setQuery(input))
} 
  return (
    <nav className="navbar">
      
     <form  className="search-container" onSubmit={handleSubmit}>
         <div className="setting" onClick={()=> setActiveMenu("settings")}>
        
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 9.6660156 2 L 9.1757812 4.5234375 C 8.3516137 4.8342536 7.5947862 5.2699307 6.9316406 5.8144531 L 4.5078125 4.9785156 L 2.171875 9.0214844 L 4.1132812 10.708984 C 4.0386488 11.16721 4 11.591845 4 12 C 4 12.408768 4.0398071 12.832626 4.1132812 13.291016 L 4.1132812 13.292969 L 2.171875 14.980469 L 4.5078125 19.021484 L 6.9296875 18.1875 C 7.5928951 18.732319 8.3514346 19.165567 9.1757812 19.476562 L 9.6660156 22 L 14.333984 22 L 14.824219 19.476562 C 15.648925 19.165543 16.404903 18.73057 17.068359 18.185547 L 19.492188 19.021484 L 21.826172 14.980469 L 19.886719 13.291016 C 19.961351 12.83279 20 12.408155 20 12 C 20 11.592457 19.96113 11.168374 19.886719 10.710938 L 19.886719 10.708984 L 21.828125 9.0195312 L 19.492188 4.9785156 L 17.070312 5.8125 C 16.407106 5.2676813 15.648565 4.8344327 14.824219 4.5234375 L 14.333984 2 L 9.6660156 2 z M 11.314453 4 L 12.685547 4 L 13.074219 6 L 14.117188 6.3945312 C 14.745852 6.63147 15.310672 6.9567546 15.800781 7.359375 L 16.664062 8.0664062 L 18.585938 7.40625 L 19.271484 8.5917969 L 17.736328 9.9277344 L 17.912109 11.027344 L 17.912109 11.029297 C 17.973258 11.404235 18 11.718768 18 12 C 18 12.281232 17.973259 12.595718 17.912109 12.970703 L 17.734375 14.070312 L 19.269531 15.40625 L 18.583984 16.59375 L 16.664062 15.931641 L 15.798828 16.640625 C 15.308719 17.043245 14.745852 17.36853 14.117188 17.605469 L 14.115234 17.605469 L 13.072266 18 L 12.683594 20 L 11.314453 20 L 10.925781 18 L 9.8828125 17.605469 C 9.2541467 17.36853 8.6893282 17.043245 8.1992188 16.640625 L 7.3359375 15.933594 L 5.4140625 16.59375 L 4.7285156 15.408203 L 6.265625 14.070312 L 6.0878906 12.974609 L 6.0878906 12.972656 C 6.0276183 12.596088 6 12.280673 6 12 C 6 11.718768 6.026742 11.404282 6.0878906 11.029297 L 6.265625 9.9296875 L 4.7285156 8.59375 L 5.4140625 7.40625 L 7.3359375 8.0683594 L 8.1992188 7.359375 C 8.6893282 6.9567546 9.2541467 6.6314701 9.8828125 6.3945312 L 10.925781 6 L 11.314453 4 z M 12 8 C 9.8034768 8 8 9.8034768 8 12 C 8 14.196523 9.8034768 16 12 16 C 14.196523 16 16 14.196523 16 12 C 16 9.8034768 14.196523 8 12 8 z M 12 10 C 13.111477 10 14 10.888523 14 12 C 14 13.111477 13.111477 14 12 14 C 10.888523 14 10 13.111477 10 12 C 10 10.888523 10.888523 10 12 10 z"/></svg>
      </div>
      {/* Overlay */}
    {activeMenu && (
      <div className="overlay" onClick={() => setActiveMenu(null)} />
    )}
  
        {/* Sliding Menu */}
    <div className={`settings-menu ${activeMenu === "settings" ? "open" : ""}`}>
  <div className="close"onClick={() => setActiveMenu(null)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5e5c5c"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
</div>
      <div className="setting-options">
        <h3> <Link to="/address">Address</Link></h3>
        <h3> <Link to ="/login">Login</Link></h3>
        <h3><Link to ="/signup">signup</Link></h3>
        <h3 onClick={logOut}><Link>Logout</Link></h3>
        <h3><a href="http://localhost:5174" target="_blank">Admin</a></h3>
         
     
            
      </div>
    </div>
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.7" d="M4.0828 11.8943C4.52171 9.55339 4.74117 8.38295 5.57434 7.69147C6.40752 7 7.59835 7 9.98003 7H14.0209C16.4026 7 17.5934 7 18.4266 7.69147C19.2598 8.38295 19.4792 9.55339 19.9181 11.8943L20.6681 15.8943C21.2853 19.186 21.5939 20.8318 20.6942 21.9159C19.7945 23 18.12 23 14.7709 23H9.23003C5.88097 23 4.20644 23 3.30672 21.9159C2.40701 20.8318 2.7156 19.186 3.3328 15.8943L4.0828 11.8943Z" fill="#ffee00"/>
<path d="M9.75 5.98506C9.75 4.74242 10.7574 3.73506 12 3.73506C13.2426 3.73506 14.25 4.74242 14.25 5.98506V6.98506C14.816 6.98524 15.3119 6.9868 15.7499 6.99994C15.75 6.99499 15.75 6.99003 15.75 6.98506V5.98506C15.75 3.91399 14.0711 2.23506 12 2.23506C9.92893 2.23506 8.25 3.91399 8.25 5.98506V6.98506C8.25 6.99004 8.25005 6.99501 8.25015 6.99997C8.68814 6.98681 9.18397 6.98527 9.75 6.98508V5.98506Z" fill="#202021"/>
<path d="M9.87823 15.75C10.1875 16.6249 11.0219 17.25 12.0004 17.25C12.9789 17.25 13.8133 16.6249 14.1226 15.75C14.2606 15.3595 14.6891 15.1548 15.0796 15.2928C15.4702 15.4309 15.6749 15.8594 15.5368 16.2499C15.0224 17.7054 13.6343 18.75 12.0004 18.75C10.3665 18.75 8.97841 17.7054 8.46397 16.2499C8.32594 15.8594 8.53063 15.4309 8.92117 15.2928C9.31171 15.1548 9.7402 15.3595 9.87823 15.75Z" fill="#202021"/>
</svg>
        <h2>ShopEase</h2>
         <div className="filter-btn" onClick={()=>setActiveMenu("filter")}>
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></svg>
</div>
<div className={`filter-menu ${activeMenu === "filter" ?"open" :""}`}>
<div className="close"onClick={() => setActiveMenu(null)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5e5c5c"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
</div>
</div>

        <input className="search" list="recent" placeholder="Search" onChange={(e)=>{setinput(e.target.value)}} htmlFor="recent" type="search"  />
        <button className="search-btn">Search</button>
        <datalist id="recent">
          
          <option value="uno">Uno card</option>
          <option value="watch">watch</option>
          <option value="gym strap">gym strap</option>
          <option value="slime">slime</option>
          <option value="keyboard">keyboard</option>
        </datalist>
     </form>
      <div className="nav-links">
        <Link to="/" onClick={dispatch(setQuery(""))}>Home</Link>
        <Link to="/orders">
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>Orders</Link>
        <Link to="/wishlist"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>Wishlist</Link>
      </div>
    </nav>
  );
}

export default Navbar;
