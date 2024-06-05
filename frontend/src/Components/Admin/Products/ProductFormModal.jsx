import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../../../API/Config";

const ProductFormModal = ({
  isOpen,
  closeModal,
  saveProduct,
  currentProduct,
}) => {
  // Trạng thái cho sản phẩm
  const initialState = currentProduct || {
    productName: "",
    description: "",
    price: "",
    image: null,
    qty: "",
    gender: "",
    categoryName: "",
    brandName: "",
  };

  const [categoryNames, setCategoryNames] = useState([]);
  const [brandNames, setBrandNames] = useState([]);

  const fetchCategoryNames = async () => {
    try {
      const data = await axiosClient.get("/category/");

      setCategoryNames(data.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchCategoryNames();
  }, []);

  const fetchBrandNames = async () => {
    try {
      const data = await axiosClient.get("/brand/");

      setBrandNames(data.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchBrandNames();
  }, []);

  const [product, setProduct] = useState(initialState);

  // Cập nhật trạng thái sản phẩm khi currentProduct thay đổi
  useEffect(() => {
    setProduct(currentProduct || initialState);
  }, [currentProduct]);

  const url = "http://localhost:8080/api/product/file";

  // Xử lý thay đổi đầu vào
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    console.log({ value });
    setProduct({
      ...product,
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
      product.image = currentProduct.image;
      console.log(product.image);
    } else {
      // Nếu chọn file ảnh mới, sử dụng file đã chọn
      product.image = productImage;
    }
    saveProduct(product);
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4">
              {currentProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>

            {/* Các trường nhập liệu cho các thuộc tính của sản phẩm */}
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-gray-700 font-medium"
              >
                Tên sản phẩm
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={product.productName}
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
                value={product.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                rows="3"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium"
              >
                Giá
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
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

            <div className="mb-4">
              <label htmlFor="qty" className="block text-gray-700 font-medium">
                Số lượng
              </label>
              <input
                type="number"
                id="qty"
                name="qty"
                value={product.qty}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-gray-700 font-medium"
              >
                Giới tính
              </label>
              <select
                id="gender"
                name="gender"
                value={product.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="categoryName"
                className="block text-gray-700 font-medium"
              >
                Danh mục
              </label>
              <select
                id="categoryName"
                name="categoryName"
                value={product.categoryName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              >
                <option value="">Chọn danh mục</option>
                {/* Thêm các danh mục ở đây */}
                {categoryNames.map((item, index) => (
                  <option key={item.categoryId} value={item.categoryName}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="brandName"
                className="block text-gray-700 font-medium"
              >
                Thương hiệu
              </label>
              <select
                id="brandName"
                name="brandName"
                value={product.brandName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              >
                <option value="">Chọn thương hiệu</option>
                {/* Thêm các thương hiệu ở đây */}
                {brandNames.map((item, index) => (
                  <option key={item.brandId} value={item.brandName}>
                    {item.brandName}
                  </option>
                ))}
              </select>
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
                {currentProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ProductFormModal;
