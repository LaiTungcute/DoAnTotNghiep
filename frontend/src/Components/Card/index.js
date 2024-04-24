// import React from "react";

// const CardItem = ({ image, title, description, onButtonClick }) => {
//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg">
//       {/* Hình ảnh */}
//       <img src={image} alt={title} className="w-full h-48 object-cover" />

//       {/* Nội dung của thẻ */}
//       <div className="px-6 py-4">
//         {/* Tiêu đề */}
//         <div className="font-bold text-xl mb-2">{title}</div>

//         {/* Mô tả */}
//         <p className="text-gray-700 text-base">{description}</p>
//       </div>

//       {/* Nút hành động */}
//       <div className="px-6 pt-4 pb-2">
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//           onClick={onButtonClick}
//         >
//           Thực hiện hành động
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CardItem;

import React from "react";

const CardItem = ({ image, title, price, onButtonClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Hình ảnh */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-t-lg"
      />

      {/* Nội dung của thẻ */}
      <div className="p-4">
        {/* Tiêu đề */}
        <h3 className="font-semibold text-lg">{title}</h3>

        {/* Giá */}
        <p className="text-gray-700 mb-4">{price}</p>

        {/* Nút hành động */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={onButtonClick}
        >
          Thực hiện hành động
        </button>
      </div>
    </div>
  );
};

export default CardItem;
