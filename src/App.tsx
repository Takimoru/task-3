import { useState } from "react";
import Header from "./components/Header";
import { CardDemo } from "./components/Card";

interface Post {
  tittle: string;
  content: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  return (
    <>
      <Header onAddPost={addPost} />
      <div className="flex justify-center items-start min-h-screen p-4 pt-24">
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <CardDemo
                key={index}
                title={post.tittle}
                content={post.content}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No posts yet. Create one!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
