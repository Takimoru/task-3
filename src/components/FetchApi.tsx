import { useQuery } from "@tanstack/react-query";
import { CardDemo } from "./Card";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function FetchApi() {
  const { isPending, error, data } = useQuery<Post[]>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data.map((post) => (
        <div className="flex flex-col gap-6 items-center justify-center">
          <CardDemo key={post.id} title={post.title} body={post.body} />
        </div>
      ))}
    </>
  );
}
