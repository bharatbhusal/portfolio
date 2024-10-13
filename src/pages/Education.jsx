import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import EducationCard from "../components/EducationCard";
import educationData from "../data/educationData";

const Education = () => {
	return (
		<div className="flex flex-col justify-around w-full h-[90vh] z-0">
			<h1 className="text-4xl font-bold text-center">
				Education
			</h1>
			<div className="flex justify-between w-full h-[100%]">
				<Swiper
					spaceBetween={2}
					slidesPerView={1}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
				>
					{educationData.map((item, index) => (
						<SwiperSlide
							key={index}
							className="px-2 flex flex-col justify-center items-center"
						>
							<EducationCard
								institution={item.institution}
								duration={item.duration}
								address={item.address}
								links={item.links}
								courses={item.courses}
								cgpa={item.cgpa}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Education;
