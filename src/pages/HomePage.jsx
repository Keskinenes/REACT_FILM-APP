import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

import { useEffect, useState, useCallback } from "react";
import { fetchAllMovies } from "../api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {
  addFavorite,
  removeFavorite,
  onFavoritesChange,
} from "../utils/favorites";

export default function HomePage() {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // auth ve favoriler
  const [user] = useAuthState(auth);
  const [favIds, setFavIds] = useState([]);

  // Filmleri bir kere çek
  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchAllMovies();
      setAllMovies(movies);
      setFilteredMovies(movies);
    };
    getMovies();
  }, []);

  // Kullanıcının favori film id'lerini realtime dinle
  useEffect(() => {
    if (!user) return setFavIds([]);
    const unsubscribe = onFavoritesChange(user.uid, (favs) =>
      setFavIds(favs.map((m) => m.id))
    );
    return unsubscribe;
  }, [user]);

  // SearchBar’dan gelen query’e göre filtrele
  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setFilteredMovies(allMovies);
    } else {
      const results = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(results);
    }
  }, [allMovies]);

  // Favori toggle
  const toggleFavorite = useCallback(async (movie) => {
    if (!user) {
      alert("Favorilere eklemek için giriş yapmalısınız");
      return;
    }
    if (favIds.includes(movie.id)) {
      await removeFavorite(user.uid, movie.id);
    } else {
      await addFavorite(user.uid, movie);
    }
  }, [user, favIds])

  return (
    <div>
      <Navbar onSearch={handleSearch} />

      {filteredMovies.length === 0 ? (
        <p className="text-center mt-10 text-lg">Aramanızla eşleşen film bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 text-center">
          {filteredMovies.map((movie) => {
            const isFav = favIds.includes(movie.id);
            return (
              <div
                key={movie.id}
                className="relative border-l border-r rounded-2xl mt-5 p-2 hover:scale-105 transition-all duration-300 hover:bg-gray-300 cursor-pointer"
              >
                <Link
                  to={`/movie/${movie.id}`}
                  state={{ movie }}
                  className="block"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-48 mx-auto"
                  />
                  <h2 className="text-lg font-bold">{movie.title}</h2>
                </Link>

                <button
                  onClick={() => toggleFavorite(movie)}
                  className="absolute top-2 right-2 text-2xl p-1 bg-white rounded-full shadow hover:scale-110 transition"
                >
                  {isFav ? <FaStar className="text-yellow-400" /> : <CiStar />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>

  );
}
