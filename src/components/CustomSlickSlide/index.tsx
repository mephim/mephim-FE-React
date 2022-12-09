import React from "react";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../MovieCard";
import {IMovie} from "../../shared/model/IMovie";
import './style.css';

var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

interface IPropSlider {
    children: IMovie[];
}

function CustomSlider ({children} : IPropSlider){
    return (
        <Slider {...settings}>
            {children.map((item: IMovie) => (
                <div key={Math.random()} className="px-1">
                    <MovieCard movie={item}/>
                </div>
            ))}
        </Slider>
    );
}

export default CustomSlider;
