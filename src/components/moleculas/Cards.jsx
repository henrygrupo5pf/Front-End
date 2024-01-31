

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Card } from "../atomos/Card";

// export const Cards = () => {
//   // Usa useSelector para obtener los resultados de búsqueda del estado de Redux
//   const searchResults = useSelector((state) => state.searchResults);

//   // Determina qué conjunto de datos utilizar - mockData o searchResults
//   const productsToDisplay = searchResults.length > 0 ? searchResults : allP;

//   return (
//     <div>
//       {searchResults.map((product) => (
//         <Card
//           key={product.id}
//           id={product.userId}
//           photo={product.photo}
//           name={product.name}
//           cost={product.cost}
//           description={product.description}
//           category={product.category}
//           activeStatus={product.activeStatus}
//         />
//       ))}
//     </div>
//   );
// };

import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from "../atomos/Card";
// import { allP } from "./mockData"; // Solo descomenta esta línea si realmente necesitas usar datos mock.

export const Cards = () => {
  // Usa useSelector para obtener los resultados de búsqueda del estado de Redux.
  const searchResults = useSelector((state) => state.searchResults);

  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((product) => (
          <Card
            key={product.id}
            id={product.userId}
            photo={product.photo}
            name={product.name}
            cost={product.cost}
            description={product.description}
            category={product.category}
            activeStatus={product.activeStatus}
          />
        ))
      ) : (
        <p>No hay resultados de búsqueda para mostrar.</p>
        // Aquí puedes mostrar allP si quieres usar datos mock cuando no hay resultados de búsqueda.
        // allP.map((product) => ( ... ))
      )}
    </div>
  );
};

export default Cards;
