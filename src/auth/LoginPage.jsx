import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-gray-500 min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleLogin}
                className="bg-gray-300 p-8 rounded-xl shadow-lg max-w-md w-full flex flex-col gap-6"
            >
                <input
                    className="border border-gray-350 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="border border-gray-350 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Şifre"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    className="bg-gray-600 text-white font-semibold rounded-lg py-3 hover:bg-gray-700 transition-colors cursor-pointer"
                    type="submit"
                >
                    Giriş Yap
                </button>
                {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
        </div>
    );
}
