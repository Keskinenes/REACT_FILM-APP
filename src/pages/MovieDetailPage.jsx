import { useLocation } from "react-router";
export default function MovieDetailPage() {
    const { state } = useLocation(); // 🎯 Buradan veriyi alıyoruz
    const movie = state?.movie;

    if (!movie) return <p>Film bilgisi bulunamadı</p>;

    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="mx-auto my-4 w-64"
                alt={movie.title}
            />
            <p>{movie.overview}</p>
            <p>Yayın tarihi: {movie.release_date}</p>
            <p>IMDB puanı: {movie.vote_average}</p>
        </div>
    );
}
