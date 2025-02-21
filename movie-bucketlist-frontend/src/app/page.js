// import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MovieList from "@/components/MovieList";

export default function App() {
  return (
    <body>
      <div className="page">
        <Header />
        <SearchBar />
        <MovieList />
      </div>
    </body>
  );
}
