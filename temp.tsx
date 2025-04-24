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
