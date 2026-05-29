import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const data = await login(email, password);

            console.log("LOGIN OK:", data);

            localStorage.setItem("token", data.token);

            alert("Login correcto");
        } catch (err) {
            console.log(err);
            setError("Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-black text-white">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">

                <h1 className="text-2xl text-center">Login</h1>

                <input
                    className="p-2 text-black"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="p-2 text-black"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {error}
                    </p>
                )}

                <button
                    className="bg-green-500 p-2 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

            </form>
        </div>
    );
}