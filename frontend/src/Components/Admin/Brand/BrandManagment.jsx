import React, { useState, useEffect } from "react";
import axiosClient from "../../../API/Config";
import BrandFormModal from "./BrandFormModal";

function BrandManagement() {
  const [data, setData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);

  const fetchData = async () => {
    try {
      const data = await axiosClient.get("/brand/");

      setData(data.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const url = "http://localhost:8080/api/brand/file";

  const openAddBrandModal = () => {
    setCurrentBrand(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  //   Hàm để mở modal và kiểm soát trạng thái chỉnh sửa sản phẩm
  const openEditBrandModal = (brand) => {
    setCurrentBrand(brand);
    console.log(brand.brandId);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Hàm để lưu hoặc cập nhật sản phẩm
  const saveBrand = async (product) => {
    let response;
    const formData = new FormData();
    if (product.image) {
      formData.append("image", product.image);
    }
    formData.append("brandName", product.brandName);
    formData.append("description", product.description);

    if (isEditing) {
      // Cập nhật sản phẩm hiện cóc

      response = await axiosClient.put(
        `/brand/edit/${product.brandId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt Content-Type là multipart/form-data
          },
        }
      );
    } else {
      // Thêm sản phẩm mới
      response = await axiosClient.post(`/brand/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt Content-Type là multipart/form-data
        },
      });
    }
    closeModal();
  };

  // Hàm xóa sản phẩm
  const handleDeleteBrand = (id) => {
    axiosClient.delete(`/brand/delete/${id}`);
  };

  return (
    <div
      className="p-4"
      style={{ height: "calc(100vh - 112px)", overflowY: "auto" }}
    >
      <h2 className="text-2xl font-bold mb-4">Quản lý hãng sản xuất</h2>

      {/* Hiển thị modal nếu isModalOpen là true */}
      {isModalOpen && (
        <BrandFormModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          saveProduct={saveBrand}
          currentProduct={currentBrand}
        />
      )}

      {/* Nút thêm sản phẩm */}
      <button
        onClick={openAddBrandModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm hãng sản xuất
      </button>

      {/* Bảng liệt kê sản phẩm */}
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100">ID</th>
            <th className="py-2 px-4 bg-gray-100">Tên hãng</th>
            <th className="py-2 px-4 bg-gray-100">Mô tả</th>
            <th className="py-2 px-4 bg-gray-100">Ảnh minh họa</th>

            <th className="py-2 px-4 bg-gray-100">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.brandId}>
              <td className="py-2 px-4 border-b">{product.brandId}</td>
              <td className="py-2 px-4 border-b">{product.brandName}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={`${url}/${product.image}`}
                  className="object-cover rounded-t-lg"
                  width="400px"
                  height="200px"
                  object-fit="scale-down"
                />
              </td>

              <td className="py-2 px-1 border-b">
                {/* Nút sửa sản phẩm */}
                <button
                  onClick={() => openEditBrandModal(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mb-2"
                >
                  Sửa
                </button>

                {/* Nút xóa sản phẩm */}
                <button
                  onClick={() => handleDeleteBrand(product.brandId)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BrandManagement;
