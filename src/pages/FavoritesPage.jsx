// src/pages/FavoritesPage.jsx
import { useState, useEffect } from "react";
import { onFavoritesChange, removeFavorite } from "../utils/favorites";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
    const [user] = useAuthState(auth);
    const [favorites, setFavorites] = useState([]);

    // Favori filmleri realtime dinle
    useEffect(() => {
        if (!user) return;
        const unsubscribe = onFavoritesChange(user.uid, setFavorites);
        return unsubscribe;
    }, [user]);

    if (!user) return null; // ProtectedRoute ile zaten kontrol ediliyor

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Favori Filmleriniz</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 text-center">
                    {favorites.map((movie) => (
                        <div
                            key={movie.id}
                            className="relative border rounded-2xl mt-5 p-2 hover:scale-105 transition-all duration-300 hover:bg-gray-300 cursor-pointer"
                        >
                            <button
                                onClick={() => removeFavorite(user.uid, movie.id)}
                                className="absolute top-2 right-2 text-2xl p-1 bg-white rounded-full shadow hover:scale-110 transition"
                            >
                                <FaStar className="text-yellow-400" />
                            </button>

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
                                <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
                                <p className="text-sm line-clamp-3">{movie.overview}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-10 text-lg">
                    Favori listeniz boş. Film kartlarındaki yıldız ikonuna tıklayarak favorilere ekleyebilirsiniz.
                </p>
            )}
        </div>
    );
}
