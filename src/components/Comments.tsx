import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";

interface Comment {
  name: string;
  comment: string;
}

interface CommentFormProps {
  onAddComment: (comment: Comment) => void;
}

function CommentForm({ onAddComment }: CommentFormProps) {
  const formik = useFormik({
    initialValues: { name: "", comment: "" },
    onSubmit: (values, { resetForm }) => {
      if (!values.name || !values.comment) return; // Prevent empty submissions
      onAddComment(values);
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        id="name"
        name="name"
        placeholder="Your Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Textarea
        id="comment"
        name="comment"
        placeholder="Write your comment here..."
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = (comment: Comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>
      <CommentForm onAddComment={handleAddComment} />
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="border p-4 rounded-md">
            <p className="font-semibold">{comment.name}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
