import { useState } from 'react';
import Card from "../components/Card.jsx";
import "../styles/card.css";
import "../styles/carousel.css";
import prevIcon from "/arrow_left.svg";
import nextIcon from "/arrow_right.svg";


const Home = () => {
    const cards = [
      {
        title: "Are these things dangerous for dogs?",
        description: "Is pumpkin good for dogs? Yes! Pumpkin is actually great for dogs.",
        image: "/images/picture1.jpg",
        link: "#/news"
      },
      {
        title: "It Wasn't the Dog's Fault!",
        description: "There are a lot of ways that dogs can turn a seemingly successful run in any dog sport into a total train wreck.",
        image: "/images/picture2.jpg",
        link: "#/news"
      },
      {
        title: "Dogs and Human Companions Bond!",
        description: "Brain activity of dogs and their human companions may sync when they gaze into each other's eyes, a new study suggests.Researchers say mutual gazing between humans and their canine pets may cause a similar synchronisation.",
        image: "/images/picture3.jpg",
        link: "#/news"
      },
      
    ];

    const images = [
        "/images/picture4.jpg",
        "/images/picture5.jpg",
        "/images/picture6.jpg",
        "/images/picture7.jpg",
        "/images/picture9.jpg"
    ];
  
    return (
      <main>
        <h1 className="main-title1">DOGS IN THE NEW</h1>
        <div className="card-container">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              link={card.link}
            />
          ))}
        </div>
        <div className="carousel-section">
        <h1 className="main-title1">THESE ARE OUR SUPERSTARS</h1>
            <Carousel images={images} />
        </div>
      </main>
    );
};

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="carousel">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
        <button className="carousel-button carousel-prev" onClick={handlePrev}>
            <img src={prevIcon} alt="Previous" className="carousel-icon" />
        </button>
        <button className="carousel-button carousel-next" onClick={handleNext}>
            <img src={nextIcon} alt="Next" className="carousel-icon" />
        </button>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`carousel-indicator ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    );
};

export default Home;
