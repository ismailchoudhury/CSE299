// const handleSearch = () => {
//   fetch(`/api/products/search?q=${searchQuery}`)
//     .then((response) => response.json())
//     .then((data) => {
//       history.push(`/search?q=${searchQuery}`, { searchResults: data });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// const handleSearch = () => {
//   fetch(`/api/products/search?q=${searchQuery}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);

//       return (
//         <Link to={{ pathname: "/search", state: { searchResults: data } }}>
//           Search Results
//         </Link>
//       );
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };
