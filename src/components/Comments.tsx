import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "./Skeleton";
import * as Yup from "yup";

interface Comment {
  name: string;
  comment: string;
  email: string;
}

interface CommentFormProps {
  onAddComment: (comment: Comment) => void;
}

interface CommmentPostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function FetchComments() {
  const { isPending, error, data } = useQuery<CommmentPostProps[]>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  if (isPending) return <SkeletonCard />;

  if (error) return "An error has occurred: " + error.message;

  const firstFive = data.slice(0, 5);
  return (
    <div>
      {firstFive.map((post) => (
        <div key={post.id} className="border p-4 rounded-md">
          <p className="font-semibold">{post.title}</p>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
function CommentForm({ onAddComment }: CommentFormProps) {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", comment: "", email: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!values.name || !values.comment || !values.email) return; // Prevent empty submissions
      onAddComment(values);
      resetForm();
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            id="name"
            name="name"
            placeholder="Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            id="email"
            name="email"
            placeholder="Your Email"
            value={formik.values.email}
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
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </form>
      </div>
    </>
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
            <p>{comment.email}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500">New Comments will appear here</p>
        )}
      </div>
      <FetchComments />
    </div>
  );
}
