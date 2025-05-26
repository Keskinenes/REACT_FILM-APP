import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className="bg-gray-500 min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleRegister}
                className="bg-gray-300 p-8 rounded-xl shadow-lg max-w-md w-full flex flex-col gap-6"
            >
                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                <input
                    className="border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                    Kayıt Ol
                </button>
            </form>
        </div>

    );
}
