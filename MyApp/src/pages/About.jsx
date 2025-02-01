import { useState } from 'react';
import '../styles/about.css';
import heartIconEmpty from "/favorite_outline.svg";
import heartIconFilled from "/favorite_fill.svg";



const About = () => {
  const initialCards = [
    {
      id: 1,
      image: "/images/picture15.jpg",
      title: "Bella",
      liked: false,
      likes: 115,
      description: "A sweet and loyal beagle who enjoys long walks and cuddles.",
    },
    {
      id: 2,
      image: "/images/picture16.jpg",
      title: "Buddy",
      liked: false,
      likes: 92,
      description: "A playful and energetic golden retriever who loves to fetch.",
    },
    {
      id: 3,
      image: "/images/picture17.jpg",
      title: "Daisy",
      liked: false,
      likes: 105,
      description: "A friendly and sociable bulldog who gets along with everyone.",
    },
    {
      id: 4,
      image: "/images/picture18.jpg",
      title: "Charlie",
      liked: false,
      likes: 110,
      description: "An adventurous and curious pug who loves to explore the outdoors.",
    },
    {
      id: 5,
      image: "/images/picture19.jpg",
      title: "Luna",
      liked: false,
      likes: 97,
      description: "A gentle and affectionate labrador who loves spending time by the water.",
    },
    {
      id: 6,
      image: "/images/picture20.jpg",
      title: "Max",
      liked: false,
      likes: 80,
      description: "A clever and active border collie who is eager to learn new tricks.",
    },
  ];

  const [cards, setCards] = useState(initialCards);

  const toggleLike = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? {
              ...card,
              liked: !card.liked,
              likes: card.liked ? card.likes - 1 : card.likes + 1,
            }
          : card
      )
    );
  };

  return (
    <main>
      <div className="about-page">
        <div className="text-section">
          <img src="/images/about.png" alt="Long description of image" className="long-image" />
          <div className="text-container">
            <h1>Who doesn't love dogs?</h1>
            <p>This website introduces dog types and various things about dogs, such as dog news and famous dogs in history, so that people can understand more about dogs and not do things that hurt them.</p>
            <p>Domestic dogs evolved from wolves—either grey wolves or another, now-extinct type of wolf—though there is some scientific debate about their exact origin. Genetics suggest that dogs broke off from their wild ancestors between 14,000 and 29,000 years ago and became domesticated through human interactions. There are over 400 dog breeds, but every variation is a member of the same species, Canis lupus familiaris, and all are related to other wild canines, like foxes.</p>
            <p>Dogs come in all shapes and sizes, ranging from huge Great Danes to tiny teacup Chihuahuas. Dog weights range wildly from 1.8 kilograms (4 pounds) for toy poodles to 104 kilograms (230 pounds) for the largest mastiffs. Humans used simple forms of genetic engineering to breed dogs for specific instincts and characteristics, and the first domestic dogs were likely bred for hunting. Today, many people keep pet dogs for companionship and comfort, though there are still many modern jobs for dogs, from providing services to individuals to sniffing out wildlife crime.</p>  
          </div>
        </div>
        <div className="card-section">
          <h2>CHOOSE YOUR FAVORITE</h2>
          <div className="card-container">
            {cards.map((card) => (
              <div key={card.id} className="card">
                <img src={card.image} alt={card.title} className="card-image" />
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{card.title}</h3>
                    <div className="like-container">
                      <button
                        className={`like-button ${card.liked ? "liked" : ""}`}
                        onClick={() => toggleLike(card.id)}
                      >
                        <img src={card.liked ? heartIconFilled : heartIconEmpty} alt="Favorite" className="heart-icon" />
                        
                      </button>
                      <span className="like-count">{card.likes}</span>
                    </div>
                  </div>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
