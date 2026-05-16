"use client";

import { useEffect, useState } from "react";

import app from "./firebase";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(app);

export default function Page() {
  const [page, setPage] = useState("home");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  const [randomPost, setRandomPost] = useState("");

  async function loadPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));

    const loadedPosts: string[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.text) {
        loadedPosts.push(data.text);
      }
    });

    setPosts(loadedPosts);

    if (loadedPosts.length > 0) {
      const random =
        loadedPosts[Math.floor(Math.random() * loadedPosts.length)];

      setRandomPost(random);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function sendPost() {
    if (text.trim() === "") return;

    await addDoc(collection(db, "posts"), {
      text: text,
      createdAt: Date.now(),
    });

    setText("");

    setPage("sent");

    setTimeout(() => {
      loadPosts();
      setPage("home");
    }, 2500);
  }

  // SENT
  if (page === "sent") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-center">

          <div className="text-8xl animate-bounce">
            ✦
          </div>

          <p className="mt-6 text-gray-300 text-xl">
            Your unsaid thing drifted away...
          </p>

        </div>

      </main>
    );
  }

  // WRITE
  if (page === "write") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-fuchsia-600/30 blur-[120px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-violet-700/30 blur-[120px] rounded-full animate-pulse"></div>

        <div className="relative z-10 max-w-xl w-full text-center">

          <h1 className="text-6xl font-black">
            Write Something
          </h1>

          <p className="mt-5 text-gray-400 text-lg">
            Let the feelings exist somewhere.
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your unsaid thing..."
            className="w-full mt-10 h-52 rounded-3xl bg-zinc-900/70 border border-zinc-700 p-6 text-white outline-none text-lg"
          />

          <button
            onClick={sendPost}
            className="w-full mt-6 py-5 rounded-3xl bg-white text-black text-lg font-bold hover:scale-105 transition"
          >
            Send Into The Void
          </button>

          <button
            onClick={() => setPage("home")}
            className="mt-5 text-gray-500 hover:text-white transition"
          >
            Back
          </button>

        </div>

      </main>
    );
  }

  // HEAR
  if (page === "hear") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-fuchsia-600/30 blur-[120px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-violet-700/30 blur-[120px] rounded-full animate-pulse"></div>

        <div className="relative z-10 max-w-xl w-full text-center">

          <h1 className="text-6xl font-black">
            Hear Someone
          </h1>

          <div className="mt-10 rounded-3xl bg-zinc-900/70 border border-zinc-700 p-8 text-xl text-gray-200 leading-relaxed min-h-[180px] flex items-center justify-center">
            {randomPost || "No thoughts yet..."}
          </div>

          <button
            onClick={loadPosts}
            className="w-full mt-6 py-4 rounded-3xl bg-white text-black font-bold hover:scale-105 transition"
          >
            Hear Another One
          </button>

          <button
            onClick={() => setPage("home")}
            className="mt-5 text-gray-500 hover:text-white transition"
          >
            Back
          </button>

        </div>

      </main>
    );
  }

  // HOME
  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-6 text-white">

      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-fuchsia-600/30 blur-[120px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-violet-700/30 blur-[120px] rounded-full animate-pulse"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 animate-pulse">✦</div>
        <div className="absolute top-40 right-20 animate-bounce">✦</div>
        <div className="absolute bottom-32 left-40 animate-pulse">✦</div>
        <div className="absolute bottom-20 right-32 animate-bounce">✦</div>
      </div>

      <div className="relative z-10 max-w-xl w-full text-center">

        <p className="uppercase tracking-[0.4em] text-sm text-gray-500">
          anonymous thoughts
        </p>

        <h1 className="text-7xl md:text-8xl font-black mt-6 leading-none">
          Unsaid
          <br />
          Things
        </h1>

        <p className="mt-8 text-gray-300 text-xl leading-relaxed">
          Some feelings never reach the people they were meant for.
        </p>

        <div className="mt-14 flex flex-col gap-5">

          <button
            onClick={() => setPage("write")}
            className="w-full py-5 rounded-3xl bg-white text-black text-lg font-bold hover:scale-105 transition duration-300 shadow-2xl"
          >
            Want To Write Something
          </button>

          <button
            onClick={() => {
              loadPosts();
              setPage("hear");
            }}
            className="w-full py-5 rounded-3xl bg-zinc-900/80 border border-zinc-700 text-lg hover:bg-zinc-800 transition duration-300 backdrop-blur-md"
          >
            Want To Hear Someone
          </button>

        </div>

      </div>

    </main>
  );
}