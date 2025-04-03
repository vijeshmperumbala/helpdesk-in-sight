
import React, { useState } from 'react';
import { format } from 'date-fns';
import { TicketComment, User } from '@/lib/types';
import { addComment } from '@/lib/tickets';
import { users } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { hasRole } from '@/lib/auth';

interface TicketCommentsProps {
  comments: TicketComment[];
  ticketId: string;
  currentUser: User;
  onCommentAdded: () => void;
}

export const TicketComments: React.FC<TicketCommentsProps> = ({ 
  comments, 
  ticketId, 
  currentUser,
  onCommentAdded 
}) => {
  const [commentText, setCommentText] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const { toast } = useToast();
  const isAgentOrAdmin = hasRole('agent') || hasRole('admin');

  // Find the user for each comment
  const getUserForComment = (userId: string) => {
    return users.find(user => user.id === userId) || { name: 'Unknown User', role: '' };
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      toast({
        title: 'Cannot submit empty comment',
        variant: 'destructive',
      });
      return;
    }

    addComment(
      { 
        text: commentText, 
        isInternal: isInternalComment && isAgentOrAdmin 
      }, 
      ticketId, 
      currentUser
    );
    
    setCommentText('');
    setIsInternalComment(false);
    onCommentAdded();
    
    toast({
      title: 'Comment added successfully',
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Comments</h3>
      
      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No comments yet</p>
        ) : (
          comments.map((comment) => {
            const commentUser = getUserForComment(comment.userId);
            const isCurrentUserComment = comment.userId === currentUser.id;
            
            return (
              <Card key={comment.id} className={`border ${comment.isInternal ? 'bg-amber-50 border-amber-200' : ''}`}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="font-medium">{commentUser.name}</div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded ml-2">
                        {commentUser.role}
                      </span>
                      {comment.isInternal && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded ml-2">
                          Internal Note
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <div className="text-gray-700 whitespace-pre-wrap">{comment.text}</div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      
      <div className="border rounded-md p-4 bg-white">
        <Textarea 
          placeholder="Add a comment..." 
          className="min-h-[100px] mb-3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        
        {isAgentOrAdmin && (
          <div className="flex items-center mb-3">
            <Checkbox 
              id="internal-comment" 
              checked={isInternalComment} 
              onCheckedChange={(checked) => setIsInternalComment(!!checked)} 
            />
            <label htmlFor="internal-comment" className="ml-2 text-sm cursor-pointer select-none">
              Internal note (not visible to user)
            </label>
          </div>
        )}
        
        <Button onClick={handleCommentSubmit}>
          Add Comment
        </Button>
      </div>
    </div>
  );
};
