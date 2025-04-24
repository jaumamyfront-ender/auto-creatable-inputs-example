import { UserDetails } from "@/types/User";
import Image from "next/image";
import { useState } from "react";

export default function ({ data }: UserDetails) {
  console.log(data);
  const slicedProducts = data.products.slice(0, 3);
  const slicedVideos = data.videos.slice(0, 3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
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
      <section
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
      </section>
      <h2 className="text-black">my videos</h2>

      <section
        id="videoList"
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
      </section>
      <section id="add product">
        <button
          className="w-50 h-20 border border-amber-700 bg-amber-300 cursor-pointer rounded-lg"
          onClick={handleOpenModal}
        >
          add product
        </button>
      </section>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-lg font-semibold mb-4">Add new product</h2>
          <p className="text-sm">Tu możesz dodać formularz lub treść modala.</p>
        </Modal>
      )}
    </div>
  );
}

const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50 transition transition-shadow">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
