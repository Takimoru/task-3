import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "./Skeleton";
import * as Yup from "yup";
import { toast } from "sonner";
import axios from "axios";

interface Comment {
  name: string;
  comment: string;
  email: string;
}

interface CommentFormProps {
  onAddComment: (comment: Comment) => void;
}

interface CommentPostProps {
  postId: number;
}

function FetchComments({ postId }: CommentPostProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return res.data;
    },
    enabled: !!postId,
  });

  if (isLoading) return <SkeletonCard />;
  if (isError) return <p>Error loading comments.</p>;

  return (
    <div>
      <ul>
        {data?.slice(0, 5).map((c: any) => (
          <li
            key={c.id}
            className="border p-2 rounded grid grid-col gap-4 items-center ">
            <strong>{c.email}</strong>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CommentForm({ onAddComment }: CommentFormProps) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    comment: Yup.string().required("Comment is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", comment: "", email: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onAddComment(values);
      toast.success("Comment added successfully!");
      resetForm();
    },
  });

  return (
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
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}

        <Input
          id="email"
          name="email"
          placeholder="Your Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}

        <Textarea
          id="comment"
          name="comment"
          placeholder="Write your comment here..."
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.comment && formik.errors.comment && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.comment}</p>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [...prev, comment]);
  };

  return (
    <div className="space-y-6 grid grid-col gap-4 items-center justify-center ">
      <h2 className="text-2xl font-bold">Comments</h2>

      <CommentForm onAddComment={handleAddComment} />

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-500">New Comments will appear here</p>
        )}

        {comments.map((comment, index) => (
          <div key={index} className="border p-4 rounded-md">
            <p className="font-semibold">{comment.name}</p>
            <p>{comment.email}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>

      <FetchComments postId={1} />
    </div>
  );
}
