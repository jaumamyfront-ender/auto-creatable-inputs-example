// import { CreatorDetailsWithVideosDTO } from "@/api-models/creatorDetailsWithVideosDTO";
// import { VideoRecommendationDTO } from "@/api-models/videoRecommendationDTO";
import { CreatorDetailsWithVideosDTO } from "@/api-models/creatorDetailsWithVideosDTO";
import { CreatorProductRecomendationDTO } from "@/api-models/creatorProductRecomendationDTO";
import { VideoRecommendationDTO } from "@/api-models/videoRecommendationDTO";
import { UserDetails } from "@/types/User";
import Image from "next/image";
import { useState } from "react";

export default function ({ data }: UserDetails) {
  console.log(data);
  const slicedProducts = data.products.slice(0, 3);
  const slicedVideos = data.videos.slice(0, 3);

  return (
    <div className="flex flex-col items-center">
      <header id="infoAboutUser">
        <div className="flex items-center flex-col">
          <h1 className="text-black text-lg font-sans font-bold">
            {data.creator?.name}
          </h1>
          <Image
            className="border rounded-lg"
            src={data.creator?.cardLinkViewPhotoUrl}
            width={356}
            height={356}
            alt="buyButton"
          />
        </div>
      </header>
      <h2 className="text-black text-lg">my films</h2>
      {/* <section
        id="productsList"
        className="flex flex-row flex-wrap justify-center "
      >
        {slicedProducts.map((item, index) => {
          const thumbnail = item.thumbnails?.find(
            (img) => img.width === "pX512"
          );

          const price = item.price?.find((price) => price.currency === "pln");
          return (
            <div
              className="flex items-center flex-col border border-amber-500 p-2 m-4 rounded-lg w-auto h-auto justify-between"
              key={index}
            >
              <div className="flex flex-row items-center mb-12 justify-between">
                <p className="text-black h-[48px] max-w-[200px]">
                  {item.productName}
                </p>

                <p className="text-black flex self-start ml-2">
                  {price ? `${price.price} PLN` : "Brak ceny"}
                </p>
              </div>

              {thumbnail && (
                <Image
                  key={index}
                  className="border rounded-lg h-28"
                  src={thumbnail.photoUrl}
                  width={180}
                  height={180}
                  alt="Product thumbnail"
                />
              )}
            </div>
          );
        })}
      </section> */}
      <h2 className="text-black">my videos</h2>
      <Section data={data} isVideoSection={false} />
      {/* <section
        id="productsList"
        className="flex flex-row flex-wrap justify-center "
      >
        {slicedVideos.map((item, index) => {
          const thumbnail = item.thumbnails?.find(
            (img) => img.width === "pX512"
          );

          return (
            <div
              className="flex items-center flex-col border border-amber-500 p-2 m-4 rounded-lg w-auto h-auto justify-between"
              key={index}
            >
              <div className="flex flex-row items-center mb-12 justify-between">
                <p className="text-black h-[48px] max-w-[200px]">
                  {item.videoTitle}
                </p>
              </div>

              {thumbnail && (
                <Image
                  key={index}
                  className="border rounded-lg h-28"
                  src={thumbnail.photoUrl}
                  width={180}
                  height={180}
                  alt="Product thumbnail"
                />
              )}
            </div>
          );
        })}
      </section> */}

      <Section data={data} isVideoSection={true} />
    </div>
  );
}
interface SectionProps {
  data: CreatorDetailsWithVideosDTO;
  isVideoSection: boolean;
}
const Section = ({ data, isVideoSection }: SectionProps) => {
  const slicedItems = isVideoSection
    ? data.videos.slice(0, 3)
    : data.products.slice(0, 3);

  return (
    <div>
      <section
        id="productsList"
        className="flex flex-row flex-wrap justify-center "
      >
        {slicedItems.map((item, index) => {
          const thumbnail = item.thumbnails?.find(
            (img) => img.width === "pX512"
          );

          let description = "";
          let priceText = "";

          if (!isVideoSection) {
            const productItem = item as CreatorProductRecomendationDTO;
            const price = productItem?.price.find(
              (price) => price.currency === "pln"
            );
            description = productItem.productName;
            priceText = price ? `${price.price} PLN` : "Brak ceny";
          } else {
            const videoItem = item as VideoRecommendationDTO;
            description = videoItem.videoTitle;
            priceText = "";
          }

          return (
            <div
              className="flex items-center flex-col border border-amber-500 p-2 m-4 rounded-lg w-auto h-auto justify-between"
              key={index}
            >
              <div className="flex flex-row items-center mb-12 justify-between">
                <p className="text-black h-[48px] max-w-[200px]">
                  {description}
                </p>
                {isVideoSection && (
                  <p className="text-black flex self-start ml-2">{priceText}</p>
                )}
              </div>

              {thumbnail && (
                <Image
                  key={index}
                  className="border rounded-lg h-28"
                  src={thumbnail.photoUrl}
                  width={180}
                  height={180}
                  alt="Product thumbnail"
                />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
