import { supabase } from '../config/supabase.js'

// 用户相关操作
export const userService = {
  // 创建用户
  async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // 获取用户信息
  async getUserById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // 更新用户信息
  async updateUser(id, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}

// 动物相关操作
export const petService = {
  // 获取所有动物
  async getAllPets() {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // 根据ID获取动物
  async getPetById(id) {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // 创建动物
  async createPet(petData) {
    const { data, error } = await supabase
      .from('pets')
      .insert([petData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // 更新动物信息
  async updatePet(id, updates) {
    const { data, error } = await supabase
      .from('pets')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}

// 文章/新闻相关操作
export const articleService = {
  // 获取所有文章
  async getAllArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // 搜索文章
  async searchArticles(searchTerm) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // 创建文章
  async createArticle(articleData) {
    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
    
    if (error) throw error
    return data[0]
  }
}

// 收藏相关操作
export const favoriteService = {
  // 添加收藏
  async addFavorite(userId, itemId, itemType) {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{
        user_id: userId,
        item_id: itemId,
        item_type: itemType
      }])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // 移除收藏
  async removeFavorite(userId, itemId, itemType) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('item_id', itemId)
      .eq('item_type', itemType)
    
    if (error) throw error
  },

  // 获取用户收藏
  async getUserFavorites(userId, itemType) {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        pets:item_id(*),
        articles:item_id(*)
      `)
      .eq('user_id', userId)
      .eq('item_type', itemType)
    
    if (error) throw error
    return data
  },

  // 检查是否已收藏
  async isFavorited(userId, itemId, itemType) {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('item_id', itemId)
      .eq('item_type', itemType)
      .single()
    
    return !error && data
  }
}

// 轮播图相关操作
export const carouselService = {
  // 获取轮播图
  async getCarouselImages() {
    const { data, error } = await supabase
      .from('carousel_images')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    
    if (error) throw error
    return data
  }
}
