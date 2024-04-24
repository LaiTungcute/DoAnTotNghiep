import React from "react";

const Pagination = ({
  currentPage,
  totalPage,
  totalItem,
  pageSize,
  onPageChange,
  previousLabel = "Previous",
  nextLabel = "Next",
}) => {
  // Hàm xử lý khi người dùng nhấn nút trang trước
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Hàm xử lý khi người dùng nhấn nút trang sau
  const handleNextClick = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      {/* Nút trang trước */}
      <button
        className={`px-4 py-2 border border-gray-300 rounded-l ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        {previousLabel}
      </button>

      {/* Hiển thị trang hiện tại / tổng số trang */}
      <span className="px-4 py-2 border-t border-b border-gray-300">
        {currentPage} / {totalPage}
      </span>

      {/* Nút trang sau */}
      <button
        className={`px-4 py-2 border border-gray-300 rounded-r ${
          currentPage === totalPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleNextClick}
        disabled={currentPage === totalPage}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default Pagination;
