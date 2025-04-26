// interface SectionProps {
//   data: CreatorDetailsWithVideosDTO;
//   isVideoSection: boolean;
// }
// const Section = ({ data, isVideoSection }: SectionProps) => {
//   const slicedItems = isVideoSection
//     ? data.videos.slice(0, 3)
//     : data.products.slice(0, 3);

//   return (
//     <div>
//       <section
//         id="productsList"
//         className="flex flex-row flex-wrap justify-center "
//       >
//         {slicedItems.map((item, index) => {
//           const thumbnail = item.thumbnails?.find(
//             (img) => img.width === "pX512"
//           );

//           let description = "";
//           let priceText = "";

//           if (isVideoSection) {
//             const videoItem = item as VideoRecommendationDTO;
//             description = videoItem.videoTitle;
//             priceText = "";
//           } else {
//             const productItem = item as CreatorProductRecomendationDTO;
//             const price = productItem?.price.find(
//               (price) => price.currency === "pln"
//             );
//             description = productItem.productName;
//             priceText = price ? `${price.price} PLN` : "Brak ceny";
//           }

//           return (
//             <div
//               className="flex items-center flex-col border border-amber-500 p-2 m-4 rounded-lg w-auto h-auto justify-between"
//               key={index}
//             >
//               <div className="flex flex-row items-center mb-12 justify-between">
//                 <p className="text-black h-[48px] max-w-[200px]">
//                   {description}
//                 </p>
//                 {isVideoSection && (
//                   <p className="text-black flex self-start ml-2">{priceText}</p>
//                 )}
//               </div>

//               {thumbnail && (
//                 <Image
//                   key={index}
//                   className="border rounded-lg h-28"
//                   src={thumbnail.photoUrl}
//                   width={180}
//                   height={180}
//                   alt="Product thumbnail"
//                 />
//               )}
//             </div>
//           );
//         })}
//       </section>
//     </div>
//   );
// };
//
import React, { useState } from "react";

export default function DynamicInputs() {
  const [inputs, setInputs] = useState<string[]>([]);

  const handleAddInput = () => {
    if (inputs.length < 3) {
      setInputs([...inputs, ""]);
    }
  };

  const handleChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };
  console.log(inputs);
  return (
    <div className="p-4">
      <button
        onClick={handleAddInput}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={inputs.length >= 3}
      >
        Добавить поле
      </button>

      <div className="space-y-2">
        {inputs.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            className="block w-full px-2 py-1 border border-gray-300 rounded"
          />
        ))}
      </div>
    </div>
  );
}
