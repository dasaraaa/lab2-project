import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import item1 from "../assets/images/furniture.jpg";
import item2 from "../assets/images/equipment.jpg";
import item3 from "../assets/images/library.jpg";
import item4 from "../assets/images/vehicles.jpg";

const news = [
  {
    id: 1,
    title: "New Office Furniture Arrived at UBT",
    description: "UBT has just received a shipment of modern office furniture for student and staff areas. These new pieces are designed to enhance comfort and productivity in workspaces across campus.",
    item: item1,
    Quote1: "“A comfortable workspace fosters creativity and productivity.”",
  },
  {
    id: 2,
    title: "State-of-the-Art Lab Equipment for Research",
    description: "UBT's research labs have been upgraded with the latest equipment to enhance student projects and faculty research. These tools will help advance the learning experience for future scientists and engineers.",
    item: item2,
    Quote1: "“Cutting-edge technology empowers the next generation of innovators.”",
  },
  {
    id: 3,
    title: "New Books Added to UBT Library Collection",
    description: "The UBT library has expanded its collection with several new academic books and resources for students and faculty. The new materials cover various disciplines, making it an invaluable resource for all students.",
    item: item3,
    Quote1: "“A library is a place where the world opens up to you.”",
  },
  {
    id: 4,
    title: "UBT Acquires New Vehicles for Campus Transport",
    description: "UBT has added several new vehicles to its fleet to improve campus transportation for students and staff. These vehicles will ensure easy movement around the campus, providing more flexibility for all.",
    item: item4,
    Quote1: "“Efficient transportation makes campus life easier and more connected.”",
  }
];

const News = () => {
  return (
    <div className='py-16 bg-gray-100'>
      <h2 className='text-3xl font-semibold  mb-6'>News about UBT Inventory</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
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
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='flex flex-col sm:flex-row sm:justify-between items-center'>
              <div className='py-4'>
                <Link to="/">
                  <h3 className='text-lg font-medium hover:text-blue-700 mb-4'>{item.title}</h3>
                </Link>
                <div className='w-12 h-[4px] bg-blue-700 mb-5'></div>
                <p className='text-sm text-gray-600 line-clamp-4'>{item.description}</p>
              </div>
              <div className='flex-shrink-0'>
                <img src={item.item} alt={item.title} className='max-w-[200px] h-auto object-cover'/>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default News;
