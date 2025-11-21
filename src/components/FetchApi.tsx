import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CardDemo } from "./Card";
import { SkeletonCard } from "./Skeleton";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  onclick?: () => void;
}

export default function FetchApi() {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery<Post[]>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  if (isPending) return <SkeletonCard />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data.map((post) => (
        <div
          key={post.id}
          className="grid grid-col gap-4 items-center justify-center cursor-pointer">
          <CardDemo
            title={post.title}
            body={post.body}
            onClick={() => navigate(`/post/${post.id}`)}
          />
        </div>
      ))}
    </>
  );
}
