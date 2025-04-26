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
          className="w-50 h-20 border border-amber-700 bg-amber-300 cursor-pointer rounded-lg mt-6"
          onClick={handleOpenModal}
        >
          add product
        </button>
      </section>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-lg font-semibold mb-4">Add new product</h2>
          <p className="text-sm">Tu możesz dodać formularz lub treść modala.</p>
          <DynamicInputs />
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
    <div className="fixed inset-0 flex items-center justify-center bg-discord-dark bg-opacity-50 z-50 animate-modal-in">
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

type InputItem = {
  text: string;
  option: string;
  error: string | null;
};

type SelectGroup = {
  id: number;
  inputs: InputItem[];
};

export function DynamicInputs() {
  const [selectGroups, setSelectGroups] = useState<SelectGroup[]>([]);

  const handleAddSelect = () => {
    if (selectGroups.length < 10) {
      setSelectGroups([...selectGroups, { id: Date.now(), inputs: [] }]);
    }
  };
  const handleRemoveSelectGroup = (groupId: number) => {
    setSelectGroups((prev) => prev.filter((group) => group.id !== groupId));
  };
  const handleRemoveInput = (groupId: number, inputIndex: number) => {
    setSelectGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const updatedInputs = group.inputs.filter(
            (_, idx) => idx !== inputIndex
          );
          return { ...group, inputs: updatedInputs };
        }
        return group;
      })
    );
  };

  const handleSelectChange = (groupId: number, value: string) => {
    if (value) {
      setSelectGroups((prev) =>
        prev.map((group) =>
          group.id === groupId
            ? {
                ...group,
                inputs: [
                  ...group.inputs,
                  { text: "", option: value, error: null },
                ],
              }
            : group
        )
      );
    }
  };

  const handleTextChange = (
    groupId: number,
    inputIndex: number,
    value: string
  ) => {
    setSelectGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const updatedInputs = [...group.inputs];
          updatedInputs[inputIndex] = {
            ...updatedInputs[inputIndex],
            text: value,
            error: validate(value),
          };
          return { ...group, inputs: updatedInputs };
        }
        return group;
      })
    );
  };

  const validate = (value: string) => {
    if (!value.trim()) return "Поле не должно быть пустым";
    if (value.length < 3) return "Минимум 3 символа";
    if (value.length > 20) return "Максимум 20 символов";
    return null;
  };

  const [selectedValues, setSelectedValues] = useState<Record<number, string>>(
    {}
  );

  return (
    <div className="p-4">
      <button
        onClick={handleAddSelect}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={selectGroups.length >= 10}
      >
        Добавить селект
      </button>

      <div className="space-y-8 flex flex-row flex-wrap">
        {selectGroups.map((group) => (
          <div key={group.id} className="space-y-4 mr-4">
            <div className="flex flex-row">
              <select
                value={selectedValues[group.id] || ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue) {
                    handleSelectChange(group.id, newValue);
                    setSelectedValues((prev) => ({
                      ...prev,
                      [group.id]: "",
                    }));
                  }
                }}
                className="block w-[250px] h-[34px] px-2 py-1 border border-gray-300 rounded bg-yellow-100 focus:outline-none focus:ring-0 focus:border-gray-400"
              >
                <option value="">Выберите...</option>
                <option value="Rozmiar">Model</option>
                <option value="Kolor">Capacity Of Ram</option>
                <option value="Pojemnosc">Capacity of SSD</option>
                <option value="Pojemnosc">VideoMemory</option>
                <option value="Rozmiar">Display type</option>
                <option value="Kolor">Type Connections</option>
                <option value="Pojemnosc">Other Information</option>
                <option value="Pojemnosc">price</option>
              </select>

              <button
                onClick={() => handleRemoveSelectGroup(group.id)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {group.inputs.map((input, inputIndex) => (
                <div
                  key={inputIndex}
                  className="space-y-2 flex flex-row relative w-[295px]"
                >
                  <input
                    type="text"
                    value={input.text}
                    onChange={(e) =>
                      handleTextChange(group.id, inputIndex, e.target.value)
                    }
                    className={`block w-full h-[34px] px-2 py-1 border rounded ${
                      input.error ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-0 focus:border-gray-400`}
                    placeholder={
                      input.option ? input.option : "Введите значение"
                    }
                  />
                  {input.error && (
                    <p className="text-red-500 text-sm">{input.error}</p>
                  )}
                  <button
                    onClick={() => handleRemoveInput(group.id, inputIndex)}
                    className="w-[16px] h-[32px] bg-red-500 text-white rounded absolute right-0 top-4 -translate-y-1/2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
