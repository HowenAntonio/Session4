"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      });

    inputRef.current?.focus();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const lower = search.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.body.toLowerCase().includes(lower)
    );
  }, [posts, search]);

  const totalWords = useMemo(() => {
    return filteredPosts.reduce((acc, post) => acc + post.body.split(" ").length, 0);
  }, [filteredPosts]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-lg text-gray-500 animate-pulse">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-2">Posts</h2>
        <p className="text-gray-400 text-sm">Browse and search through the latest posts</p>
      </div>

      <div className="flex gap-4 flex-wrap items-center">
        <div className="flex-1 min-w-[240px] relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts by title or body..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white shadow-sm text-gray-700 transition"
          />
        </div>
        <span className="self-center px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <ul className="space-y-5">
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 group cursor-default"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize group-hover:text-indigo-700 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm line-clamp-2">
              {post.body}
            </p>
            <span className="inline-block mt-4 text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full group-hover:bg-indigo-100 transition">
              Post #{post.id}
            </span>
          </li>
        ))}
      </ul>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
        <p className="text-sm text-gray-600">
          Total words in visible posts:{" "}
          <span className="font-bold text-indigo-700 text-base">{totalWords}</span>
        </p>
      </div>
    </div>
  );
}