
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { knowledgeBaseArticles } from "@/lib/data";
import { KnowledgeBaseArticle } from "@/lib/types";
import { Edit, Trash, Plus, Eye, Book } from "lucide-react";
import { getAllCategories } from "@/lib/knowledge-base";

const ManageKnowledgeBase = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>(knowledgeBaseArticles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<KnowledgeBaseArticle | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  // Get all unique categories from existing articles
  const categories = getAllCategories();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleAddArticle = () => {
    // Simple validation
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newArticle: KnowledgeBaseArticle = {
      id: `article-${articles.length + 1}`,
      title: formData.title,
      content: formData.content,
      category: formData.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setArticles(prev => [...prev, newArticle]);
    knowledgeBaseArticles.push(newArticle); // Add to mock data
    
    toast({
      title: "Article Added",
      description: "The article has been added successfully",
    });
    
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditArticle = () => {
    if (!currentArticle) return;
    
    // Simple validation
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const updatedArticles = articles.map(article => {
      if (article.id === currentArticle.id) {
        return {
          ...article,
          title: formData.title,
          content: formData.content,
          category: formData.category,
          updatedAt: new Date().toISOString(),
        };
      }
      return article;
    });

    // Update the mock data
    const articleIndex = knowledgeBaseArticles.findIndex(a => a.id === currentArticle.id);
    if (articleIndex !== -1) {
      knowledgeBaseArticles[articleIndex] = {
        ...knowledgeBaseArticles[articleIndex],
        title: formData.title,
        content: formData.content,
        category: formData.category,
        updatedAt: new Date().toISOString(),
      };
    }

    setArticles(updatedArticles);
    
    toast({
      title: "Article Updated",
      description: "The article has been updated successfully",
    });
    
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteArticle = () => {
    if (!currentArticle) return;
    
    const updatedArticles = articles.filter(article => article.id !== currentArticle.id);
    
    // Update the mock data
    const articleIndex = knowledgeBaseArticles.findIndex(a => a.id === currentArticle.id);
    if (articleIndex !== -1) {
      knowledgeBaseArticles.splice(articleIndex, 1);
    }

    setArticles(updatedArticles);
    
    toast({
      title: "Article Deleted",
      description: "The article has been deleted successfully",
    });
    
    setIsDeleteDialogOpen(false);
    setCurrentArticle(null);
  };

  const openEditDialog = (article: KnowledgeBaseArticle) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (article: KnowledgeBaseArticle) => {
    setCurrentArticle(article);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (article: KnowledgeBaseArticle) => {
    setCurrentArticle(article);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
    });
    setCurrentArticle(null);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Knowledge Base</h1>
            <p className="text-gray-500 mt-1">Create, edit, or remove knowledge base articles</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Article
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    No articles found
                  </TableCell>
                </TableRow>
              ) : (
                articles.map(article => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>{new Date(article.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openViewDialog(article)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(article)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(article)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Add Article Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Knowledge Base Article</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>{category}</SelectItem>
                    ))}
                    <SelectItem value="New Category">New Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.category === "New Category" && (
                <div className="grid gap-2">
                  <Label htmlFor="new-category">New Category Name</Label>
                  <Input
                    id="new-category"
                    name="category"
                    value={formData.category === "New Category" ? "" : formData.category}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={10}
                  value={formData.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddArticle}>
                Add Article
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Article Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Knowledge Base Article</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>{category}</SelectItem>
                    ))}
                    <SelectItem value="New Category">New Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.category === "New Category" && (
                <div className="grid gap-2">
                  <Label htmlFor="edit-new-category">New Category Name</Label>
                  <Input
                    id="edit-new-category"
                    name="category"
                    value={formData.category === "New Category" ? "" : formData.category}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  rows={10}
                  value={formData.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditArticle}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Article Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{currentArticle?.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">
                  {currentArticle?.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Updated {currentArticle && new Date(currentArticle.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md border">
                  {currentArticle?.content}
                </pre>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Article Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Article</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete the article "{currentArticle?.title}"? This action cannot be undone.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteArticle}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ManageKnowledgeBase;
