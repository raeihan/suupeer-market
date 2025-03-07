import React, { useState, useEffect } from "react";
import { supabase } from "../utils/SupaClient"; // Pastikan file konfigurasi Supabase tersedia
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/tailus/Header";
const HistoryPages = () => {
  const [historyData, setHistoryData] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("history_payment")
        .select("*, product(product_name, price)");

      if (error) {
        console.error("Error fetching history:", error);
      } else {
        // Kelompokkan data berdasarkan order_id
        const groupedData = Object.values(
          data.reduce((acc, item) => {
            if (!acc[item.order_id]) {
              acc[item.order_id] = {
                ...item,
                items: [
                  {
                    product_name: item.product.product_name,
                    price: item.product.price,
                    count: item.count,
                  },
                ],
              };
            } else {
              acc[item.order_id].items.push({
                product_name: item.product.product_name,
                price: item.product.price,
                count: item.count,
              });
            }
            return acc;
          }, {})
        );

        setHistoryData(groupedData);
      }
    };

    fetchHistory();
  }, []);

  const openModal = (id) => {
    setSelectedHistory(id);
  };

  const closeModal = () => {
    setSelectedHistory(null);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historyData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  return (
    <div>
      <Helmet>
        <title>History belanja</title>
      </Helmet>
      <Header/>
      <div className="overflow-x-auto p-8">
      <button className="btn btn-outline mb-6" onClick={() => navigate(-1)}>
          <h2>{"<"}</h2>
        </button>
        <h2 className=" text-center text-2xl font-bold pb-4">History</h2>
        <table className="table w-full">
          <thead className=" ">
            <tr className=" border-2 dark:border-white border-black">
              <th className="text-center">No</th>
              <th className="text-center">Order id</th>
              <th className="text-center">Tanggal</th>
              <th className="text-center">Detail</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr
                key={order.order_id}
                className=" border-2 dark:border-white border-black"
              >
                <td className="text-center">{indexOfFirstItem + index + 1}</td>
                <td className="text-center">{order.order_id}</td>
                <td className="text-center">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => openModal(order.order_id)}
                    className="btn dark:text-white btn-sm btn-info"
                  >
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border border-white rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedHistory && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Detail Riwayat - Order ID {selectedHistory}
            </h3>

            {historyData.find((order) => order.order_id === selectedHistory)
              ?.items.length > 0 && (
              <div>
                <p className="py-2">
                  <strong>Tanggal:</strong>{" "}
                  {new Date(
                    historyData.find(
                      (order) => order.order_id === selectedHistory
                    )?.created_at
                  ).toLocaleDateString()}
                </p>
                <p className="py-2">
                  <strong>Status:</strong>{" "}
                  <span className="bg-green-500 p-2 rounded-xl text-white">
                    {
                      historyData.find(
                        (order) => order.order_id === selectedHistory
                      )?.status
                    }
                  </span>
                </p>

                <h4 className="font-bold mt-4">Daftar product:</h4>
                <ul className="list-disc pl-5">
                  {historyData
                    .find((order) => order.order_id === selectedHistory)
                    ?.items.map((item, index) => (
                      <li key={index} className="py-2">
                        <strong>{item.product_name}</strong> x{" "}
                        {
                          historyData.find(
                            (order) => order.order_id === selectedHistory
                          )?.quantity
                        }{" "}
                        - Rp {item.price}
                      </li>
                    ))}
                </ul>
                <p className="py-2">
                  <strong>Total count:</strong>{" "}
                  {
                    historyData.find(
                      (order) => order.order_id === selectedHistory
                    )?.gross_amount
                  }
                </p>
              </div>
            )}

            <div className="modal-action">
              <button onClick={closeModal} className="btn">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPages;