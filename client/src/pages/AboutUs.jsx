import React from 'react';
import video from "../assets/images/video.mp4"
import Header from '../components/Header';
import f1 from "../assets/images/f1.jpg"
import f2 from "../assets/images/f2.jpg"
import f3 from "../assets/images/f3.jpg"
import Footer from '../components/Footer';
const posts = [
    {
      id: 1,
      title: 'Luxury in Every Spray',
      href: '#',
      description:
      "The attention to detail in each perfume is unmatched. I feel like I’m wrapped in luxury every time I wear one",
      datetime: '2020-03-16',
      date: 'Mar 16, 2020',
      author: {
        name: 'Lily Divine',
        role: 'Co-Founder / CTO',
        imageUrl: f1,
      },
    },
    {
        id: 1,
        title: 'The Most Complimented Fragrance',
        href: '#',
        description:
          'The quality and elegance of Lilia Beauty’s perfumes are evident in every spray. ',
        date: 'Aug 11, 2022',
        datetime: '2020-03-16',
        author: {
          name: 'Ela Frey',
          role: ' CTO',
          href: '#',
          imageUrl:f2,
        },
      },
      {
        id: 1,
        title: 'Captivating from Start to Finish',
        href: '#',
        description:
          'From the first whiff to the lasting impression, Lilia Beauty’s fragrances are simply captivating.',
        date: 'Dec 16, 2020',
        datetime: '2024-03-19',
        author: {
          name: 'Dua Zein',
          role: 'Designer',
          href: '#',
          imageUrl:f3,
        },
      },
    
  ]
const people = [
    {
      name: 'Leslie Alexander',
      role: 'Inventory Manager',
      image: f1       
    },
    {
        name: 'Leslie Alexander',
        role: 'System Administrator',
        image: f2  
      },
      {
        name: 'Leslie Alexander',
        role: ' Departmental Representativ',
        image:f3          
      },
      {
        name: 'Leslie Alexander',
        role: 'Inventory Auditor',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          
      },
      ]
function AboutUs() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <Header />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
            <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
          </svg>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us - UBT Inventory</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">The UBT Inventory system is designed to efficiently manage resources across the university, from classroom supplies to lab equipment, providing students and faculty with the tools they need for academic and research success. </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <video className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src={video} autoPlay muted loop playsInline />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <p className="text-base font-semibold leading-7 text-blue-900">How the Inventory System works?</p>
                <li className="flex gap-x-3">
                  
                  <span><strong className="font-semibold text-gray-900">Inventory Items</strong> The inventory items are added to the system by the Inventory Management Team, which ensures that all university assets are properly recorded and categorized.</span>
                </li>
                <li className="flex gap-x-3">
                  
                  <span><strong className="font-semibold text-gray-900">Accessible 24/7.</strong> The catalog provides a comprehensive view of all available inventory items. Users can access the catalog at any time, from any device, and browse through categories such as furniture, electronics, equipment, and more </span>
                </li>
                <li className="flex gap-x-3">
                  
                  <span><strong className="font-semibold text-gray-900">Maintenance and Support. </strong> Users can report any issues with inventory items directly through the system, which helps the inventory team maintain the quality and condition of all assets.</span>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet the team.</h2>
          <p className="mt-6 text-lg leading-8 text-gray-800">
          The university inventory system is typically managed by a dedicated team or department responsible for overseeing the proper functioning, maintenance, and tracking of university assets.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img alt="" src={person.image} className="h-16 w-16 rounded-full" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-blue-800">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer />
    </div>

    
  );
}

export default AboutUs;
