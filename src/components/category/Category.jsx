import React from "react";
import { useNavigate } from "react-router-dom";

// Category data
const category = [
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/saree-removebg-preview.png?alt=media&token=4579c662-a27c-43e2-b6d4-cb3a3bdca2fb",
    name: "Sarees",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/Dress1-removebg-preview.png?alt=media&token=95a8cb8d-97e5-4f6e-bafd-749978690920",
    name: "Dresses",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/T-shirt_1-removebg-preview.png?alt=media&token=a311f45a-70d7-4e37-b3a6-20e8f6a02a88",
    name: "Tops",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/Jeans_2-removebg-preview.png?alt=media&token=7b4fa7ac-8a63-4093-a8a9-9a832bb4bb94",
    name: "Jeans",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/Kurti_1-removebg-preview.png?alt=media&token=e0793b4b-57f0-4e72-bbcf-af8fdf28fdc4",
    name: "All Kurtis",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/Gown_1-removebg-preview.png?alt=media&token=459009ba-17b4-45a0-b321-39720349e5c1",
    name: "Gowns",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/Shirt_1-removebg-preview.png?alt=media&token=b34b34f4-c536-4e43-997c-3851da167ca2",
    name: "Shirts",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/plazzo_1-removebg-preview.png?alt=media&token=bb89300b-90f6-46f7-99db-8baf8c4303dd",
    name: "Palazzos",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/Skirt_1-removebg-preview.png?alt=media&token=d415dff5-fe9a-40f8-8311-91aacdc7e126",
    name: "Skirts",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/Jumpsuit_1-removebg-preview.png?alt=media&token=c4781251-4ab1-44bd-a3dd-f61e6463936c",
    name: "Jumpsuits",
  },
];

const Category = () => {
  const navigate = useNavigate();

  // Split categories into two arrays for two rows
  const firstRowCategories = category.slice(0, 5);
  const secondRowCategories = category.slice(5);

  return (
    <div>
      <div className="flex flex-col mt-5">
        <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
          <div className="flex ">
            {/* Render categories for first row */}
            {firstRowCategories.map((item, index) => (
              <div key={index} className="px-3 lg:px-10">
                <div
                  onClick={() => navigate(`/category/${item.name}`)}
                  className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1 flex justify-center items-center"
                  style={{
                    border: "2px solid red",
                    backgroundColor: "#FFC0CB",
                  }} // Added border style here
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase">
                  {item.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Render categories for second row */}
      <div className="flex flex-col mt-5">
        <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
          <div className="flex ">
            {secondRowCategories.map((item, index) => (
              <div key={index} className="px-3 lg:px-10">
                <div
                  onClick={() => navigate(`/category/${item.name}`)}
                  className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1 flex justify-center items-center"
                  style={{
                    border: "2px solid red",
                    backgroundColor: "#FFC0CB",
                  }} // Added border style here
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase">
                  {item.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none; } .hide-scroll-bar::-webkit-scrollbar { display: none; }",
        }}
      />
    </div>
  );
};

export default Category;
