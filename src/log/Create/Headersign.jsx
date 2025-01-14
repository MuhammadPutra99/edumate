import { useState, useEffect, useContext } from "react";
import "../../AddItem.css";
import Google from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmail, signInWithGoogle } from "../../admin/auth/firebaseService";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export default function Headersign() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    // Cleanup function
    return () => {
      setError("");
      setIsLoading(false);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validasi input
    if (!username || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    try {
      const user = await registerWithEmail(email, password, username);
      dispatch({ type: "LOGIN", payload: user });
      console.log("User berhasil didaftarkan:", user);
      toast.success("Registrasi berhasil!", {
        position: "top-center",
      });
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email sudah terdaftar");
          break;
        case "auth/invalid-email":
          setError("Format email tidak valid");
          break;
        case "auth/weak-password":
          setError("Password terlalu lemah");
          break;
        default:
          setError("Terjadi kesalahan saat registrasi");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const user = await signInWithGoogle();
      dispatch({ type: "LOGIN", payload: user });
      console.log("Google sign in successful:", user);
      navigate("/home");
    } catch (error) {
      console.error("Google sign in error:", error);
      // Cek apakah error karena user membatalkan
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        // Jika user membatalkan, hanya reset loading state tanpa menampilkan error
        console.log("User cancelled the login");
      } else {
        // Untuk error lainnya, tampilkan pesan error
        setError("Gagal login dengan Google");
      }
    } finally {
      // Pastikan loading state di-reset dalam segala kondisi
      setIsLoading(false);
    }
  };

  return (
    <div className="px-[480px] relative bottom-7">
      <div className="w-full h-[630px] bg-gradient-to-b from-[#FF635A] to-[#952A25] rounded-xl shadow-lg">
        <p className="montserrat text-white text-5xl font-semibold text-center pt-8">Hi There!</p>
        <p className="montserrat text-white text-xl font-light text-center">Let's Verify Yourself.</p>

        {error && (
          <div className="mx-24 mt-4 p-3 bg-red-500 text-white rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col px-24 pt-10 gap-y-5">
          {/* Input Username */}
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white placeholder:opacity-70"
              placeholder="Username"
              disabled={isLoading}
              required
            />
          </div>

          {/* Input Email */}
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white placeholder:opacity-70"
              placeholder="Email"
              disabled={isLoading}
              required
            />
          </div>

          {/* Input Password */}
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white placeholder:opacity-70"
              placeholder="Password"
              disabled={isLoading}
              required
            />
          </div>

          {/* Input Confirm Password */}
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white placeholder:opacity-70"
              placeholder="Confirm Password"
              disabled={isLoading}
              required
            />
          </div>

          {/* Register Button */}
          <div className={`flex justify-center items-center w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 rounded-3xl py-3 cursor-pointer shadow-lg transition-all duration-200 relative top-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            <button 
              type="submit" 
              disabled={isLoading}
              className="montserrat text-xl font-semibold text-white w-full h-full"
            >
              {isLoading ? "Processing..." : "Register"}
            </button>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center items-center relative top-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full flex justify-center items-center bg-gradient-to-r from-zinc-700 to-zinc-900 hover:bg-gradient-to-r hover:from-zinc-600 hover:to-zinc-800 rounded-3xl text-white font-semibold shadow-lg transition px-6 py-2.5 gap-x-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <img src={Google} alt="Google logo" className="h-8"/>
              Sign In with Google
            </button>
          </div>

          <p className="flex justify-center items-center gap-x-2 text-white font-light relative bottom-1">
            Already Have Account?
            <Link to="/login" className="text-white font-normal hover:underline">
              Login Here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
