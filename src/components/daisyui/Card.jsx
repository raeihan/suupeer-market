import React from "react";

const Card = ({title, image, desc, price}) => {
  return (
    <div className="card card-compact bg-gray-200 shadow-xl dark:bg-gray-600">
      <figure className="m-2 rounded-lg">
        <img
          src={image}
          alt="Shoes"
          className="h-48 object-cover p-5 "
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <p>{price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-warning">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
