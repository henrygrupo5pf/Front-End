import { Card } from "../atomos";
import { allP } from "./mockData";

export const Cards = () => {
    const allProducts= allP

  return (
   

    <div>
      <div>
        {allProducts.map((product) => (
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
        ))}
      </div>
    </div>
  );
};


