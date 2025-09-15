-- 用户表
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100) UNIQUE NOT NULL,
  favorite_breed VARCHAR(50),
  other_breed VARCHAR(100),
  shipping_address TEXT,
  billing_address TEXT,
  theme_preference VARCHAR(10) DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 动物表
CREATE TABLE pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(50) NOT NULL,
  age INTEGER,
  description TEXT,
  image_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'available', -- available, adopted, pending
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文章/新闻表
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  external_link VARCHAR(500),
  category VARCHAR(50),
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 收藏表
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL,
  item_type VARCHAR(20) NOT NULL, -- 'pet' or 'article'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- 轮播图表
CREATE TABLE carousel_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(200),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_favorites_user_item ON favorites(user_id, item_type);
CREATE INDEX idx_carousel_order ON carousel_images(display_order, is_active);

-- 插入示例数据
INSERT INTO pets (name, breed, age, description, image_url, status) VALUES
('Buddy', 'Golden Retriever', 3, 'A friendly and energetic dog who loves playing fetch.', '/images/picture1.jpg', 'available'),
('Luna', 'Husky', 2, 'Beautiful blue-eyed husky with a gentle personality.', '/images/picture2.jpg', 'available'),
('Max', 'Labrador', 5, 'Obedient and well-trained, perfect for families.', '/images/picture3.jpg', 'available');

INSERT INTO articles (title, content, external_link, category, tags) VALUES
('Are these things dangerous for dogs?', 'Is pumpkin good for dogs? Yes! Pumpkin is actually great for dogs.', 'https://www.petmd.com/dog/nutrition/can-dogs-eat-pumpkin', 'health', ARRAY['nutrition', 'safety']),
('It Wasn''t the Dog''s Fault!', 'There are a lot of ways that dogs can turn a seemingly successful run in any dog sport into a total train wreck.', 'https://dognews.com/mj-nelson-not-the-dogs-fault-handlers-owners-trainers-take-fair-share-of-blame-when-training-for-performance-events', 'training', ARRAY['behavior', 'training']),
('Dogs and Human Companions Bond!', 'Brain activity of dogs and their human companions may sync when they gaze into each other''s eyes, a new study suggests.', 'https://www.akc.org/expert-advice/lifestyle/is-the-dog-human-bond-unique/', 'research', ARRAY['bonding', 'science']);

INSERT INTO carousel_images (image_url, title, description, display_order) VALUES
('/images/picture4.jpg', 'Superstar Dog 1', 'Our amazing superstar dog', 1),
('/images/picture5.jpg', 'Superstar Dog 2', 'Another wonderful companion', 2),
('/images/picture6.jpg', 'Superstar Dog 3', 'Loyal and loving friend', 3),
('/images/picture7.jpg', 'Superstar Dog 4', 'Perfect family pet', 4),
('/images/picture9.jpg', 'Superstar Dog 5', 'Adorable and playful', 5);
