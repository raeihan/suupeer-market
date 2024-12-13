import React from "react";

const SupportPayment = () => {
  return (
    <section id="support-payment" className="my-20">
      <h2 className="text-center text-4xl font-bold my-10 dark:text-white">Support Payment</h2>
      <div className="flex justify-center flex-wrap px-56 py-10 gap-12 max-lg:px-2 dark:bg-white">
        <LogoPayment
          logo={
            "https://i0.wp.com/umsu.ac.id/berita/wp-content/uploads/2024/07/cara-lihat-nomor-gopay-di-aplikasi-gojek.webp?fit=850%2C510&ssl=1"
          }
        />
        <LogoPayment
          logo={
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhvTtjN1Bj37W3jTiire9jlqgP046Je6-JPvIVEMjW6avji3kH1eC5HyUDIY8q1l6z89kidy_XZz4cX7-d_rdSentSrY94naUFcRo-NhiEvMUWmevEbQz-xRdMLUFSr61dHVvbVDq58GmxM0UAIgwnfCak8KWr0wTa0UmmjdUQTTcm2pEd3YjuHtPj9Q/s2161/Logo%20QRIS.png"
          }
        />
        <LogoPayment
          logo={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHj-wu5hTMSbYu_uFO2r_5xpvJoYYxgT0kQ&s"
          }
        />
        <LogoPayment
          logo={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1200px-Logo_dana_blue.svg.png"
          }
        />
        <LogoPayment
          logo={
            "https://i.pinimg.com/736x/60/42/c3/6042c3148add711c946833bbc2b90f6d.jpg"
          }
        />
      </div>
    </section>
  );
};

const LogoPayment = ({ logo }) => {
  return (
    <div>
      <img src={logo} className="size-24 object-contain" />
    </div>
  );
};

export default SupportPayment;
