import { useState, useEffect } from 'react';
import "../styles/news.css";
import { articleService } from '../services/database.js';

const News = () => {
    const [filterText, setFilterText] = useState(""); 
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            setLoading(true);
            const articles = await articleService.getAllArticles();
            setItems(articles);
        } catch (error) {
            console.error('Error loading articles:', error);
            setError('Failed to load articles');
            // 如果数据库连接失败，使用默认数据
            setItems([
                { id: "1", title: "Are these things dangerous for dogs?", external_link: "https://www.petmd.com/dog/nutrition/can-dogs-eat-pumpkin"},
                { id: "2", title: "It Wasn't the Dog's Fault!", external_link: "https://dognews.com/mj-nelson-not-the-dogs-fault-handlers-owners-trainers-take-fair-share-of-blame-when-training-for-performance-events" },
                { id: "3", title: "Dogs and Human Companions Bond!", external_link: "https://www.akc.org/expert-advice/lifestyle/is-the-dog-human-bond-unique/" },
            ]);
        } finally {
            setLoading(false);
        }
    };
  
    const handleFilterChange = (e) => {
      setFilterText(e.target.value.toLowerCase()); 
    };
  
    const handleDragStart = (e, index) => {
      e.dataTransfer.setData("draggedItemIndex", index);
    };
  
    const handleDrop = (e, dropIndex) => {
      e.preventDefault();
      const draggedItemIndex = e.dataTransfer.getData("draggedItemIndex");
  
      if (draggedItemIndex === null) return;
  
      const reorderedItems = Array.from(items);
      const [draggedItem] = reorderedItems.splice(draggedItemIndex, 1);
      reorderedItems.splice(dropIndex, 0, draggedItem);
  
      setItems(reorderedItems);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const filteredItems = items.filter(
      (item) =>
        item.title.toLowerCase().includes(filterText) ||
        (item.external_link && item.external_link.toLowerCase().includes(filterText))
    );

    if (loading) {
        return (
            <main>
                <div className="news-container">
                    <h1>Resources</h1>
                    <div className="loading">Loading articles...</div>
                </div>
            </main>
        );
    }
  
    return (
        <main>
            <div className="news-container">
                <h1>Resources</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="search-bar">
                <input
                    type="text"
                    placeholder="Filter resources..."
                    value={filterText}
                    onChange={handleFilterChange}
                />
                </div>
        
                <div className="news-list">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="news-item"
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="news-row">
                          <span className="news-title">{item.title}</span>
                          <a href={item.external_link} target="_blank" rel="noopener noreferrer" className="news-link">
                          External Link
                          </a>
                      </div>
                    </div>
                ))
                ) : (
                  <div className="no-results">No results found for "{filterText}"</div>
                )}
                </div>
            </div>
            <div className="Bottom_Banner">
                <img src="/images/news.jpg" alt="Banner" className="banner-image" />
            </div>
        </main>
    );
};

export default News;
