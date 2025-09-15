# 数据库设置指南

## 1. Supabase 项目设置

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 在项目设置中找到 API 配置
3. 复制项目 URL 和 anon public key

## 2. 环境变量配置

1. 复制 `.env.example` 为 `.env`
2. 填入你的 Supabase 配置：

```env
VITE_SUPABASE_URL=你的项目URL
VITE_SUPABASE_ANON_KEY=你的API密钥
```

## 3. 数据库表创建

在 Supabase SQL 编辑器中运行 `database_schema.sql` 文件中的 SQL 语句来创建所需的表。

## 4. 功能说明

### 已集成的功能：
- **用户注册**：用户信息保存到 `users` 表
- **文章管理**：从 `articles` 表加载新闻/文章
- **轮播图**：从 `carousel_images` 表加载图片
- **收藏功能**：用户可以收藏动物和文章

### 数据库表结构：
- `users` - 用户信息
- `pets` - 动物信息
- `articles` - 文章/新闻
- `favorites` - 用户收藏
- `carousel_images` - 轮播图

## 5. 部署注意事项

确保在部署时设置正确的环境变量，这样应用才能连接到 Supabase 数据库。
