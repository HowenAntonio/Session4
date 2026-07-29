"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

export default function DetailsPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [highlight, setHighlight] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setLoading(false);
      });
  }, []);

  const charCount = useMemo(() => {
    return post ? post.body.length : 0;
  }, [post]);

  const wordCount = useMemo(() => {
    return post ? post.body.split(" ").length : 0;
  }, [post]);

  const handleHighlight = () => {
    setHighlight((prev) => !prev);
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-lg text-gray-500 animate-pulse">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-md">
        <p className="text-red-500 text-lg font-semibold">Post not found.</p>
        <Link href="/2602123622">
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-md font-medium">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-6">Post Details</h2>

        <div
          ref={contentRef}
          className={`p-8 bg-white rounded-xl shadow border-2 transition-all duration-500 ${
            highlight
              ? "border-yellow-400 bg-yellow-50 shadow-yellow-200"
              : "border-gray-100 shadow-sm hover:shadow-md"
          }`}
        >
          <span className="inline-block text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full mb-4">
            Post #{post.id}
          </span>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">{post.body}</p>
        </div>

        <div className="flex gap-4 flex-wrap mt-6">
          <div className="px-5 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 block mb-1">Characters</span>
            <strong className="text-indigo-700 text-lg">{charCount}</strong>
          </div>
          <div className="px-5 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 block mb-1">Words</span>
            <strong className="text-indigo-700 text-lg">{wordCount}</strong>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleHighlight}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
            highlight
              ? "bg-yellow-400 text-gray-800 hover:bg-yellow-500"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
          }`}
        >
          {highlight ? "Remove Highlight" : "Highlight"}
        </button>
        <Link href="/2602123622">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium shadow-sm">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}