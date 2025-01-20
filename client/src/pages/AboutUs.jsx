import React from 'react';
import video from "../assets/images/videoo.mp4"
import Header from '../components/Header';
import f1 from "../assets/images/f1.jpg"
import f2 from "../assets/images/f2.jpg"
import f3 from "../assets/images/f3.jpg"
import Footer from '../components/Footer';
const posts = [
    {
      id: 1,
      title: 'Students',
      href: '#',
      description:
      "The inventory system has made it so much easier for us to find and request the equipment we need for our projects and labs. The process is straightforward, and we get updates on our requests instantly.",
      datetime: '2020-03-16',
      date: 'Mar 16, 2020',
      author: {
        name: 'Lily Divine',
        imageUrl: f1,
      },
    },
    {
        id: 1,
        title: 'Staff',
        href: '#',
        description:
          'Managing department supplies used to be a headache, but with this system, everything is organized and at our fingertips. I can quickly check what we have and plan accordingly ',
        date: 'Aug 11, 2022',
        datetime: '2020-03-16',
        author: {
          name: 'Ela Frey',
          href: '#',
          imageUrl:f2,
        },
      },
      {
        id: 1,
        title: 'Administrator',
        href: '#',
        description:
          'This system has revolutionized how we manage inventory across the university. The detailed reports and analytics help us make better decisions about resource allocation.',
        date: 'Dec 16, 2020',
        datetime: '2024-03-19',
        author: {
          name: 'Dua Zein',
          href: '#',
          imageUrl:f3,
        },
      },
    
  ]
const people = [
    {
      name: 'Leslie Alexander',
      role: 'Visionary Developer',
      image: f1       
    },
    {
        name: 'Leslie Alexander',
        role: 'Expert Analyst',
        image: f2  
      },
      {
        name: 'Leslie Alexander',
        role: ' Support Specialist',
        image:f3          
      },
      {
        name: 'Leslie Alexander',
        role: 'Collaborative Leader',
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
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us - UBT Inventory System</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">Our mission is to provide universities with an intuitive and reliable system that simplifies the tracking, monitoring, and maintenance of inventory. We aim to support educational institutions in their quest for operational excellence, allowing them to focus on what matters most: fostering knowledge and innovation.</p>
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
                <li className="flex gap-x-3">
                  
                  <span><strong className="font-semibold text-gray-900">Comprehensive Inventory Tracking. </strong>From laboratory equipment to classroom supplies, our system ensures all assets are accurately logged and easily accessible.</span>
                </li>
                <li className="flex gap-x-3">
                  
                  <span><strong className="font-semibold text-gray-900">User-Friendly Interface. </strong>Designed with simplicity in mind, our platform is easy to navigate for administrators, staff, and other users. </span>
                </li>
                <li className="flex gap-x-3">
                  
                  <span><strong className="font-semibold text-gray-900">Flexible Customization. </strong>  Adapt the system to meet your university’s specific requirements. </span>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our team.</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img alt="" src={person.image} className="h-16 w-16 rounded-full" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="bg-blue-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Experiences with out Inventory System</h2>
          
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-400 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
               
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0 " />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </div>

    
  );
}

export default AboutUs;
