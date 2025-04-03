
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  getAllArticles, 
  searchArticles, 
  getAllCategories 
} from "@/lib/knowledge-base";
import { KnowledgeBaseArticle } from "@/lib/types";
import { Search, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const KnowledgeBase = () => {
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeBaseArticle | null>(null);

  useEffect(() => {
    // Load all articles on component mount
    const allArticles = getAllArticles();
    setArticles(allArticles);
    
    // Load all categories
    const allCategories = getAllCategories();
    setCategories(allCategories);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setArticles(getAllArticles());
    } else {
      const searchResults = searchArticles(term);
      setArticles(searchResults);
    }
    
    setSelectedCategory(null);
    setSelectedArticle(null);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    
    if (category === null) {
      setArticles(getAllArticles());
    } else {
      const filteredArticles = getAllArticles().filter(article => article.category === category);
      setArticles(filteredArticles);
    }
    
    setSelectedArticle(null);
  };

  const handleArticleSelect = (article: KnowledgeBaseArticle) => {
    setSelectedArticle(article);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Knowledge Base</h1>
            <p className="text-xl text-gray-600">
              Find answers to frequently asked questions and common issues
            </p>
          </div>
          
          <div className="flex items-center relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search knowledge base..." 
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg border shadow-sm p-4">
                <h3 className="font-medium text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryFilter(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      selectedCategory === null ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryFilter(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedCategory === category ? 'bg-primary text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              {selectedArticle ? (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">{selectedArticle.title}</CardTitle>
                      <button 
                        onClick={() => setSelectedArticle(null)}
                        className="text-sm text-primary hover:underline"
                      >
                        Back to Articles
                      </button>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {selectedArticle.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap">
                        {selectedArticle.content}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {articles.length === 0 ? (
                    <div className="text-center py-12">
                      <Book className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                      <p className="text-gray-500">
                        Try adjusting your search or browse categories
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {articles.map((article) => (
                        <Card 
                          key={article.id} 
                          className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleArticleSelect(article)}
                        >
                          <CardContent className="p-4">
                            <h3 className="font-medium text-lg mb-1 text-left">{article.title}</h3>
                            <Badge variant="outline" className="mb-2">
                              {article.category}
                            </Badge>
                            <p className="text-gray-600 text-sm line-clamp-2 text-left">
                              {article.content.substring(0, 150)}...
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgeBase;
