import React from "react";

const WhyChoose = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl sm:text-4xl text-center font-bold my-8 sm:my-10 dark:text-white">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <WhyCard
          title={"Seamless Shopping Experience"}
          image={"./experience.svg"}
          desc={
            "Our online store application offers a smooth and intuitive shopping journey, allowing customers to easily browse, filter, and purchase their favorite items within minutes."
          }
        />
        <WhyCard
          title={"Exclusive Deals and Discounts"}
          image={"./discount.svg"}
          desc={
            "Enjoy access to exclusive promotions and discounts available only on our app. Save more while shopping for high-quality products tailored to your preferences."
          }
        />
        <WhyCard
          title={"Fast and Reliable Delivery"}
          image={"./delivery.svg"}
          desc={
            "We ensure quick and dependable delivery services to your doorstep, giving you peace of mind and an efficient shopping experience from start to finish."
          }
        />
      </div>
    </div>
  );
};

const WhyCard = ({ title, image, desc }) => {
  return (
    <div className="p-6 w-full bg-gray-300 rounded-xl dark:bg-gray-700 dark:text-white shadow-md">
      <div className="flex justify-center">
        <img src={image} className="h-40 sm:h-48 lg:h-52 object-contain" alt={title} />
      </div>
      <h2 className="text-center text-2xl sm:text-3xl font-bold mt-4">{title}</h2>
      <p className="mt-4 text-justify text-sm sm:text-base">{desc}</p>
    </div>
  );
};

export default WhyChoose;