"use client"

import Header from "@/components/Header";
import MovieList from "@/components/MovieList";

export default function App() {

  return (
    <body>
      <div className="page">
        <Header />
        <MovieList />
      </div>
    </body>
  );
}
