import React from "react";
import { useAuth } from "../../utils/store/useAuth";
import { useBasket } from "../../utils/store/useBasket";
import { Link } from "react-router-dom";

const Card = ({ title, image, desc, price, idProduct, count, isBasketPage }) => {
  const { user } = useAuth();
  const { addToBasket, updateItemCount } = useBasket();

  const addBasket = () => {
    addToBasket({
      id_user: user.id,
      id_product: idProduct,
      product_name: title,
      count: 1,
      price: price,
    });
  };

  return (
    <div className="card card-compact bg-gray-200 shadow-xl dark:bg-gray-600 dark:text-white">
      <figure className="m-2 rounded-lg">
        <img src={image} alt="Product" className="h-48 object-cover p-5" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <p>{price}</p>
        {isBasketPage && (
          <div className="flex items-center gap-3">
            <p>{count}</p>
            <button onClick={() => updateItemCount(idProduct, count - 1)} className="btn bg-red-400">-</button>
            <button onClick={() => updateItemCount(idProduct, count + 1)} className="btn bg-green-400">+</button>
          </div>
        )}
        <div className="card-actions justify-end">
          {!user ? (
            <Link to={"/loginpage"} className="btn bg-yellow-400">
              Add to Basket
            </Link>
          ) : (
            <button onClick={addBasket} className="btn bg-yellow-400">
              Add to Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;