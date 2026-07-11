import React from 'react'


const ProductModal = () => {
  return (
    <div className='add-modal'>
      <form>
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
          <input type="file" name='image' />
        </div>

        <div className="name">
          <p>Name</p>
          <input type="text" placeholder='Enter product name' name='name' />
        </div>

        <div className="price">
          <p>Price</p>
          <input type="text" placeholder='Enter price' name='price' />
        </div>

        <div className="stock">
          <p>Stock</p>
          <input type="number" placeholder='Enter stock quantity' name='stock' />
        </div>

        <div className="discount">
          <p>Discount</p>
          <input type="text" placeholder='Enter discount %' name='discount' />
        </div>

        <div className="description-field">
          <p>Description</p>
          <textarea
            name="description"
            placeholder="Enter detailed description"
          ></textarea>
        </div>

       <button>Add Product</button>
      </form>
    </div>
  )
}

export default ProductModal

