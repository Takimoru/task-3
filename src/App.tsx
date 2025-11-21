// App.tsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/Homepage";
import FetchApi from "./components/FetchApi";
import ContentInside from "./components/content"; // Assuming you create this file
import "./index.css";
import { Toaster } from "@/components/ui/sonner";

interface Post {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: { title: string; content: string }) => {
    const newPost: Post = {
      id: Date.now(),
      title: post.title,
      content: post.content,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <>
      <Header onAddPost={addPost} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex justify-center items-start min-h-screen p-4 pt-24 ">
              <div className="flex flex-wrap justify-center gap-2 w-full ">
                <div></div>
                {posts.map((post) => (
                  <HomePage
                    key={post.id}
                    title={post.title}
                    body={post.content}
                  />
                ))}
                <FetchApi />
                {posts.length === 0 && (
                  <div className="w-full">
                    <p className="text-center text-gray-500 ">
                      No posts yet. Create one!
                    </p>
                  </div>
                )}
              </div>
            </div>
          }
        />
        <Route path="/post/:id" element={<ContentInside />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
