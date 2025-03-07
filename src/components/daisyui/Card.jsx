import React from "react";
import { useAuth } from "../../utils/store/useAuth";
import { useBasket } from "../../utils/store/useBasket";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ title, image, desc, price, idProduct, count, isBasketPage }) => {
  const { user } = useAuth();
  const { addToBasket, updateItemCount } = useBasket();
  const navigate = useNavigate();

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
    <div 
      className="card card-compact bg-gray-200 shadow-xl dark:bg-gray-600 dark:text-white cursor-pointer"
      onClick={() => navigate(`/product/${idProduct}`)}
    >
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
            <button onClick={(e) => { e.stopPropagation(); updateItemCount(idProduct, count - 1); }} className="btn btn-error dark:text-white">-</button>
            <button onClick={(e) => { e.stopPropagation(); updateItemCount(idProduct, count + 1); }} className="btn btn-success dark:text-white">+</button>
          </div>
        )}
        <div className="card-actions justify-end">
          {!user ? (
            <Link to={"/loginpage"} className="btn bg-yellow-400 dark:text-white" onClick={(e) => e.stopPropagation()}>
              Login
            </Link>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); addBasket(); }} className="btn border-0 bg-yellow-400 dark:text-white">
              Add to Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
