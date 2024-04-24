const Toast = ({ message, type, onClose }) => {
  // Lớp Tailwind CSS tùy thuộc vào loại thông báo (thành công, cảnh báo, lỗi)
  const getToastClass = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };

  // Trả về thành phần Toast
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg ${getToastClass(
        type
      )}`}
    >
      <div className="flex items-center">
        <span>{message}</span>
        <button className="ml-4 text-white" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
