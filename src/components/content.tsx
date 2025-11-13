import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  onclick?: () => void;
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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-lg">{data.body}</p>
    </div>
  );
}
