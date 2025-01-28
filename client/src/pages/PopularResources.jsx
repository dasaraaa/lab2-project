import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from "swiper/modules"
import 'swiper/css';
import 'swiper/css/pagination';

import ItemCard from './Items/ItemCard';
const categories = [
  "Choose a category of UBT inventory items", 
  "Technology", 
  "Lab Equipment", 
  "Furniture", 
  "Book Materials", 
  "Appliances"
];

const PopularResources = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose a category of UBT inventory items");

  useEffect(() => {
    fetch("items.json")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Failed to fetch items:", error));
  }, []);

  const filteredItems =
    selectedCategory === "Choose a category of UBT inventory items"
      ? items
      : items.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Popular Resources</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] bg-gray-100 px-4 py-2 rounded-md focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180:{
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
         {
         
         filteredItems.length > 0 && filteredItems.map((item, index) => (
            <SwiperSlide key={index}>
               <ItemCard item={item}/>
            </SwiperSlide>

      ))}
        
      </Swiper>
     
    </div>
  );
};

export default PopularResources;   