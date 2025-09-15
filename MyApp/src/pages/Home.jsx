import { useState, useEffect } from 'react';
import Card from "../components/Card.jsx";
import "../styles/card.css";
import "../styles/carousel.css";
import prevIcon from "/arrow_left.svg";
import nextIcon from "/arrow_right.svg";
import { articleService, carouselService } from '../services/database.js';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [carouselImages, setCarouselImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [articlesData, carouselData] = await Promise.all([
                articleService.getAllArticles(),
                carouselService.getCarouselImages()
            ]);
            setArticles(articlesData);
            setCarouselImages(carouselData);
        } catch (error) {
            console.error('Error loading data:', error);
            // 如果数据库连接失败，使用默认数据
            setArticles([
                {
                    id: "1",
                    title: "Are these things dangerous for dogs?",
                    content: "Is pumpkin good for dogs? Yes! Pumpkin is actually great for dogs.",
                    external_link: "#/news"
                },
                {
                    id: "2", 
                    title: "It Wasn't the Dog's Fault!",
                    content: "There are a lot of ways that dogs can turn a seemingly successful run in any dog sport into a total train wreck.",
                    external_link: "#/news"
                },
                {
                    id: "3",
                    title: "Dogs and Human Companions Bond!",
                    content: "Brain activity of dogs and their human companions may sync when they gaze into each other's eyes, a new study suggests.",
                    external_link: "#/news"
                }
            ]);
            setCarouselImages([
                { image_url: "/images/picture4.jpg" },
                { image_url: "/images/picture5.jpg" },
                { image_url: "/images/picture6.jpg" },
                { image_url: "/images/picture7.jpg" },
                { image_url: "/images/picture9.jpg" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main>
                <div className="loading">Loading...</div>
            </main>
        );
    }
  
    return (
      <main>
        <h1 className="main-title1">DOGS IN THE NEW</h1>
        <div className="card-container">
          {articles.slice(0, 3).map((article) => (
            <Card
              key={article.id}
              title={article.title}
              description={article.content}
              image="/images/picture1.jpg" // 默认图片，可以根据需要调整
              link={article.external_link || "#/news"}
            />
          ))}
        </div>
        <div className="carousel-section">
        <h1 className="main-title1">THESE ARE OUR SUPERSTARS</h1>
            <Carousel images={carouselImages} />
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
          src={images[currentIndex]?.image_url || images[currentIndex]}
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
