import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Navbar({ onSearch }) {
    const [user] = useAuthState(auth);

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <div className="max-w-5xl mx-auto">
            <nav className="relative flex items-center justify-between bg-white border rounded-xl mt-2 shadow-md p-4">

                <Link to="/" className="text-xl font-bold items-center">
                    Film App
                </Link>

                <div className="flex items-center space-x-4 ">
                    <Link to="/favorites" className="px-2 py-1 hover:underline rounded-lg">
                        Favoriler
                    </Link>
                </div>

                <div className="flex-1 mx-8">
                    <SearchBar onSearch={onSearch} />
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="font-bold">
                                {user.email.split("@")[0].toUpperCase()}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
                            >
                                Çıkış Yap
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm hover:underline">
                                Giriş Yap
                            </Link>
                            <Link to="/register" className="text-sm hover:underline">
                                Kayıt Ol
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
