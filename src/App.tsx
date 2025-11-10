import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./components/Homepage";
import FetchApi from "./components/FetchApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Post {
  title: string;
  content: string;
}

const queryClient = new QueryClient();

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Header onAddPost={addPost} />
      <div className="flex justify-center items-start min-h-screen p-4 pt-24">
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {posts.map((post, index) => (
            <HomePage key={index} title={post.title} body={post.content} />
          ))}
          <FetchApi />
          {posts.length === 0 && (
            <div className="w-full">
              <p className="text-center text-gray-500">
                No posts yet. Create one!
              </p>
            </div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
