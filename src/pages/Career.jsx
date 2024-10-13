import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import CareerCard from "../components/CareerCard";
import careerData from "../data/careerData";

const Career = () => {
	return (
		<div className="p-6 flex flex-col justify-between w-full h-screen">
			<h1 className="text-4xl font-bold text-center">
				Career
			</h1>
			<div className="flex w-full h-[100%]">
				<Swiper
					spaceBetween={2}
					slidesPerView={1}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
				>
					{careerData.map((item, index) => (
						<SwiperSlide
							key={index}
							className="p-5 flex flex-col justify-center items-center"
						>
							<CareerCard
								company={item.company}
								role={item.role}
								duration={item.duration}
								address={item.address}
								description={item.description}
								achievements={item.achievements}
								links={item.links}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Career;
