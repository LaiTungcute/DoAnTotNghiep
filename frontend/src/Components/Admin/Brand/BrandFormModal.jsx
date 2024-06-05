import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../../../API/Config";

const BrandFormModal = ({
  isOpen,
  closeModal,
  saveProduct,
  currentProduct,
}) => {
  // Trạng thái cho sản phẩm
  const initialState = currentProduct || {
    brandName: "",
    description: "",
    image: null,
  };

  const [brand, setBrand] = useState(initialState);

  useEffect(() => {
    setBrand(initialState || currentProduct);
  }, [currentProduct]);

  const url = "http://localhost:8080/api/brand/file";

  // Xử lý thay đổi đầu vào
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    console.log({ value });
    setBrand({
      ...brand,
      [name]: files ? files[0] : value,
    });
  };

  // State để quản lý hình ảnh
  const [imagePreview, setImagePreview] = useState(
    currentProduct ? currentProduct.image : ""
  );
  const [productImage, setProductImage] = useState(null);

  // useRef để quản lý input file
  const fileInputRef = useRef(null);

  // Xử lý khi người dùng chọn một file ảnh mới
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo URL tạm thời cho file ảnh và hiển thị
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setProductImage(file); // Lưu file ảnh vào state
    }
  };

  // Xử lý gửi form

  // Sử dụng useEffect để thiết lập imagePreview khi currentProduct thay đổi
  useEffect(() => {
    if (currentProduct) {
      setImagePreview(currentProduct.image); // Thiết lập URL của hình ảnh hiện tại
      setProductImage(null); // Khởi tạo lại file ảnh
    }
  }, [currentProduct]);

  // Xử lý gửi form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!productImage) {
      // Nếu không chọn file ảnh mới, giữ nguyên URL của hình ảnh hiện tại
      brand.image = currentProduct.image;
      console.log(brand.image);
    } else {
      // Nếu chọn file ảnh mới, sử dụng file đã chọn
      brand.image = productImage;
    }
    saveProduct(brand);
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4">
              {currentProduct ? "Sửa hãng sản xuất" : "Thêm hãng mới"}
            </h2>

            {/* Các trường nhập liệu cho các thuộc tính của sản phẩm */}
            <div className="mb-4">
              <label
                htmlFor="brandName"
                className="block text-gray-700 font-medium"
              >
                Tên hãng
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                value={brand.brandName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Mô tả
              </label>
              <textarea
                id="description"
                name="description"
                value={brand.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                rows="3"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium"
              >
                Hình ảnh
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="mt-1"
                accept="image/*"
                ref={fileInputRef}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-400 text-white py-2 px-4 rounded mr-4"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                {currentProduct ? "Lưu thay đổi" : "Thêm hãng"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default BrandFormModal;
