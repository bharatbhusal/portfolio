"use client";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import CareerCard from "@/components/cards/CareerCard";
import careerData from "@/data/careerData";

const Career = () => {
  return (
    <div className="flex flex-col justify-around w-full min-h-screen py-8 z-0 overflow-hidden overflow-y-scroll">
      <h1 className="text-4xl font-bold text-center">Career</h1>
      <div className="flex w-full lg:w-[70%] xl:w-[60%] lg:mx-auto px-4 sm:px-6 md:px-8 justify-center">
        <Carousel orientation="vertical" className="w-full">
          {careerData.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-11/12 sm:basis-10/12 md:basis-1/2 lg:basis-1/3 pb-4"
            >
              <CareerCard {...item} />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Career;
