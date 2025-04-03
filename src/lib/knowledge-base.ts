
import { knowledgeBaseArticles } from "./data";
import { KnowledgeBaseArticle } from "./types";

// Get all knowledge base articles
export const getAllArticles = (): KnowledgeBaseArticle[] => {
  return [...knowledgeBaseArticles].sort((a, b) => 
    a.title.localeCompare(b.title)
  );
};

// Get article by ID
export const getArticleById = (id: string): KnowledgeBaseArticle | undefined => {
  return knowledgeBaseArticles.find((article) => article.id === id);
};

// Search knowledge base articles
export const searchArticles = (query: string): KnowledgeBaseArticle[] => {
  return knowledgeBaseArticles
    .filter((article) => {
      // Search in title and content
      const matchesQuery = 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase());
        
      return matchesQuery;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};

// Get articles by category
export const getArticlesByCategory = (category: string): KnowledgeBaseArticle[] => {
  return knowledgeBaseArticles
    .filter((article) => article.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
};

// Get all unique categories
export const getAllCategories = (): string[] => {
  const categories = knowledgeBaseArticles.map(article => article.category);
  return [...new Set(categories)].sort();
};
