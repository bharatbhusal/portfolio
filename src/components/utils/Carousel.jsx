import React from "react";
import { DotButton, useDotButton } from "./DotButtons";

import useEmblaCarousel from "embla-carousel-react";

const Carousel = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi);

	return (
		<section className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{slides.map((slide, index) => (
						<div className="embla__slide" key={index}>
							<div className="embla__slide__number">{slide}</div>
						</div>
					))}
				</div>
			</div>

			<div className="embla__controls">
				<div className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={"embla__dot".concat(
								index === selectedIndex
									? " embla__dot--selected"
									: ""
							)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Carousel;
