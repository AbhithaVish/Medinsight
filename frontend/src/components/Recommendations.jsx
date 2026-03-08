// import React, { useEffect, useState } from 'react';

// const Recommendations = ({ diagnosis }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products from your Node.js backend filtered by diagnosis
//     fetch(`/api/products/recommend?query=${diagnosis}`)
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, [diagnosis]);

//   return (
//     <div className="recommendation-section">
//       <h3>Recommended for your Recovery</h3>
//       <div className="product-grid">
//         {products.map(product => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.name} />
//             <p>{product.name}</p>
//             <span>LKR {product.price}</span>
//             <button>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Recommendations;recommendationService.js