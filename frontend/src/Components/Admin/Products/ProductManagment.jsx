import React, { useState, useEffect } from "react";
import Pagination from "../../panigation";
import axiosClient from "../../../API/Config";
import ProductFormModal from "./ProductFormModal";

function ProductManagement() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Kích thước trang
  const [totalItems, settotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchData = async () => {
    try {
      const data = await axiosClient.get("/product/", {
        params: {
          currentPage: currentPage - 1,
          pageSize,
        },
      });

      setData(data.data.product);
      settotalItems(data.data.totalItems);
      setTotalPages(data.data.totalPage);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, data]);

  const url = "http://localhost:8080/api/product/file";

  const openAddProductModal = () => {
    setCurrentProduct(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Hàm để mở modal và kiểm soát trạng thái chỉnh sửa sản phẩm
  const openEditProductModal = (product) => {
    setCurrentProduct(product);
    console.log(product.productId);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Hàm để lưu hoặc cập nhật sản phẩm
  const saveProduct = async (product) => {
    let response;
    const formData = new FormData();
    if (product.image) {
      formData.append("image", product.image);
    }
    formData.append("productName", product.productName);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("qty", product.qty);
    formData.append("gender", product.gender);
    formData.append("categoryName", product.categoryName);
    formData.append("brandName", product.brandName);

    if (isEditing) {
      // Cập nhật sản phẩm hiện cóc

      response = await axiosClient.put(
        `/product/edit/${product.productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt Content-Type là multipart/form-data
          },
        }
      );
    } else {
      // Thêm sản phẩm mới
      response = await axiosClient.post(`/product/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt Content-Type là multipart/form-data
        },
      });
    }
    closeModal();
  };

  // Hàm xóa sản phẩm
  const handleDeleteProduct = (id) => {
    axiosClient.delete(`/product/delete/${id}`);
  };

  // Hàm chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="p-4"
      style={{ height: "calc(100vh - 112px)", overflowY: "auto" }}
    >
      <h2 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h2>

      {/* Hiển thị modal nếu isModalOpen là true */}
      {isModalOpen && (
        <ProductFormModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          saveProduct={saveProduct}
          currentProduct={currentProduct}
        />
      )}

      {/* Nút thêm sản phẩm */}
      <button
        onClick={openAddProductModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm sản phẩm
      </button>

      {/* Bảng liệt kê sản phẩm */}
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100">ID</th>
            <th className="py-2 px-4 bg-gray-100">Tên sản phẩm</th>
            <th className="py-2 px-4 bg-gray-100">Giá</th>
            <th className="py-2 px-4 bg-gray-100">Mô tả</th>
            <th className="py-2 px-4 bg-gray-100">Ảnh minh họa</th>
            <th className="py-2 px-4 bg-gray-100">Số lượng</th>
            <th className="py-2 px-4 bg-gray-100">Giới tính</th>
            <th className="py-2 px-4 bg-gray-100">Loại</th>
            <th className="py-2 px-4 bg-gray-100">Hãng</th>

            <th className="py-2 px-4 bg-gray-100">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.productId}</td>
              <td className="py-2 px-4 border-b">{product.productName}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={`${url}/${product.image}`}
                  className="w-full h-4 object-cover rounded-t-lg"
                />
              </td>
              <td className="py-2 px-4 border-b">{product.qty}</td>
              <td className="py-2 px-4 border-b">{product.gender}</td>
              <td className="py-2 px-4 border-b">{product.categoryName}</td>
              <td className="py-2 px-4 border-b">{product.brandName}</td>

              <td className="py-2 px-1 border-b">
                {/* Nút sửa sản phẩm */}
                <button
                  onClick={() => openEditProductModal(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mb-2"
                >
                  Sửa
                </button>

                {/* Nút xóa sản phẩm */}
                <button
                  onClick={() => handleDeleteProduct(product.productId)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItem={totalItems}
        totalPage={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductManagement;
