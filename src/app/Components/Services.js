"use client";

import React from "react";
import Image from "next/image";

const ServiceCard = ({ title, description, imgSrc }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
            <div className="relative">
                <Image
                    src={imgSrc}
                    alt={title}
                    width={1000}
                    height={500}
                    className="object-cover w-full h-64"
                />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">{title}</h3>
                <p className="text-[#333333] mb-4">{description}</p>
                <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-[#1E3A8A] transition">
                    Read More
                </button>
            </div>
        </div>
    );
};

const ServicesPage = () => {
    return (
        <div className="bg-[#F9FAFB]">
            {/* Services Description */}
            <div className="py-10 w-full mx-auto px-4 md:px-10">
                <h2 className="text-heading text-center md:text-start text-xl md:text-4xl font-serif p-8">
                    Our Expertise in Software Development
                </h2>
                <p className="text-center text-lg text-[#4B5563] mb-12">
                    We provide top-tier software solutions tailored to business needs. Our team of experts
                    specializes in various domains of software development, ensuring high-quality and scalable applications.
                </p>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    <ServiceCard
                        title="Custom Software Development"
                        description="We develop tailored software solutions to meet your unique business needs, ensuring high performance and security."
                        imgSrc="https://www.sphinx-solution.com/blog/wp-content/uploads/2024/05/custom-software-development-1.webp"
                    />
                    <ServiceCard
                        title="Cybersecurity Solutions"
                        description="We provide robust cybersecurity solutions to protect businesses from threats, ensuring data integrity and compliance."
                        imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMO74EyzsuMLAvCwA6L46_4GfV8TKWCwcB1w&s"
                    />
                    <ServiceCard
                        title="Graphic Design Services"
                        description="We offer creative and professional graphic design services, including branding, logo design, UI/UX design, and marketing materials."
                        imgSrc="https://odysseydesignco.com/wp-content/uploads/2019/05/logographic.png"
                    />
                    <ServiceCard
                        title="Web Application Development"
                        description="We build scalable, high-performance web applications using modern technologies like React, Node.js, and Next.js."
                        imgSrc="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfDg9bgoyDnM5useDBXAi6si_r3bakajC2E9AW7hdM7HGoHQijf88EWW_FFGgm66Kcrbs2aC_41QWKIch0gmaqbCmH9Fx6WBtRPm4DXkQe0hhhrAzMwXy2eN3pgvCv6k-jb8vlB-5Ghx4F5id0wODLlOKZP?key=rIivelhjQuTO-3ukXd3_mw"
                    />
                    {/* <ServiceCard
                        title="Mobile App Development"
                        description="We create user-friendly and high-performance mobile apps for iOS and Android, enhancing user engagement and experience."
                        imgSrc="https://pathwaycentres.oxfordinternational.com/wp-content/uploads/2024/02/DSC00444-scaled.jpg"
                    /> */}
                    <ServiceCard
                        title="UI/UX Design Services"
                        description="Our design team crafts engaging and intuitive user interfaces that improve user experience and increase customer satisfaction."
                        imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToLf_WLANhbUwj71yWj5JkwtgYPgutlmSdXg&s"
                    />
                    {/* <ServiceCard
                        title="Cloud Solutions"
                        description="We help businesses migrate to cloud-based infrastructures, ensuring reliability, scalability, and cost-efficiency."
                        imgSrc="https://static.vecteezy.com/system/resources/thumbnails/002/792/944/small/cloud-computing-circuit-future-technology-concept-background-free-vector.jpg"
                    /> */}
                    <ServiceCard
                        title="E-Commerce Development"
                        description="We specialize in building e-commerce platforms that offer seamless user experience, secure transactions, and high scalability."
                        imgSrc="https://www.magetop.com/blog/wp-content/uploads/2022/06/E-Commerce-Development-Bloom-IT.jpg"
                    />
                    {/* <ServiceCard
                        title="DevOps & IT Consulting"
                        description="Our DevOps experts streamline development and deployment processes, ensuring faster releases and improved efficiency."
                        imgSrc="https://motivitylabs.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-13-at-3.58.57-PM-1.jpeg"
                    /> */}
                    
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
