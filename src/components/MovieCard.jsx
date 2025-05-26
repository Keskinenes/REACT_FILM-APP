import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function MovieCard({ movie, isFav, onToggle }) {
    const [user] = useAuthState(auth);

    const handleToggle = async () => {
        if (!user) {
            alert("Favorilere eklemek için giriş yapmalısınız");
            return;
        }
        await onToggle(movie);
    };

    return (
        <div className="relative border rounded-2xl p-4 hover:scale-105 transition-all duration-300 hover:bg-gray-100 cursor-pointer">
            {/* Favori butonu */}
            <button
                onClick={handleToggle}
                className="absolute top-2 right-2 text-2xl p-1 bg-white rounded-full shadow hover:scale-110 transition"
            >
                {isFav ? <FaStar /> : <CiStar />}
            </button>

            {/* Detay sayfasına Link */}
            <Link to={`/movie/${movie.id}`} state={{ movie }} className="block">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full rounded-lg mb-2"
                />
                <h2 className="text-lg font-bold mb-1">{movie.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
            </Link>
        </div>
    );
}
