const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function fetchAllMovies(query) {
    try {
        const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&&page=3`);
        const data = await res.json();

        if (data.results) {
            console.log("Filmler:", data.results);
            return data.results;
        } else {
            console.log("Veri alınamadı");
            return [];
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        return [];
    }
}
