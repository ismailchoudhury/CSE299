// import { useState } from "react";

// export const useCreateProduct = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const createProduct = async productData => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/products/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(productData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setIsLoading(false);
//         setError(errorData.error);
//         return;
//       }

//       // If the product creation is successful, you might not need to return any data.

//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       setError("An error occurred while creating the product.");
//     }
//   };

//   return { createProduct, isLoading, error };
// };
