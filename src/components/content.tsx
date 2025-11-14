import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CardDemo } from "./Card";
import CommentPost from "./Comments";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Logic for fetching posts (NO UI CODE here)
export default function ContentInside() {
  const { id } = useParams<{ id: string }>();
  const { isPending, error, data } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return res.data;
    },
    enabled: !!id, // Hanya jalankan query jika id ada
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "Post not found.";

  return (
    <>
      <div key={data.id} className="grid grid-col items-center justify-center">
        <CardDemo title={data.title} body={data.body} />
      </div>
      <span></span>
      <div>
        <CommentPost />
      </div>
    </>
  );
}
