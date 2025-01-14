import { useContext, useState } from "react";
import '../../AddItem.css';
import { AuthContext } from "../../context/AuthContext";
import Google from '../../assets/google.png';
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail, signInWithGoogle } from '../../admin/auth/firebaseService';
import { toast } from "react-hot-toast";

export default function Headerlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Email dan password harus diisi");
      setIsLoading(false);
      return;
    }

    try {
      const user = await loginWithEmail(email, password);
      // Dispatch setelah login berhasil
      dispatch({ type: "LOGIN", payload: user });
      
      toast.success("Login berhasil!", {
        position: "top-center",
      });
      const timeoutId = setTimeout(() => {
        navigate("/home");
      }, 100);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Login error:", error);
      switch (error.code) {
        case "auth/user-not-found":
          setError("User tidak ditemukan");
          break;
        case "auth/wrong-password":
          setError("Password salah");
          break;
        case "auth/invalid-email":
          setError("Format email tidak valid");
          break;
        default:
          setError("Terjadi kesalahan saat login");
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
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
        
        const timeoutId = setTimeout(() => {
          navigate("/home");
        }, 100);
        
        return () => clearTimeout(timeoutId);
      }
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
    <div className="px-[480px] py-5">
      <div className="w-full h-[530px] bg-gradient-to-b from-[#FF635A] to-[#952A25] rounded-xl shadow-lg">
        <p className="montserrat text-white text-5xl font-semibold text-center pt-8">Hi Mate!</p>
        <p className="montserrat text-white text-xl font-light text-center">U're Comeback Again.</p>

        {error && (
          <div className="mx-24 mt-4 p-3 bg-red-500 text-white rounded-lg text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col px-24 pt-14 gap-y-8" onSubmit={handleLogin}>
          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white placeholder:opacity-70"
              placeholder="Email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="w-full bg-[#952A25] flex flex-row gap-x-5 px-8 py-3 rounded-2xl shadow-lg">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-xl text-white placeholder:text-white placeholder:opacity-70"
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>

          <div className={`flex justify-center items-center w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 rounded-3xl py-3 cursor-pointer shadow-lg transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            <button 
              type="submit" 
              className="montserrat text-xl font-semibold text-white w-full h-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </div>

          <div className="flex justify-center items-center relative bottom-2">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center bg-gradient-to-r from-zinc-700 to-zinc-900 hover:bg-gradient-to-r hover:from-zinc-600 hover:to-zinc-800 rounded-3xl text-white font-semibold shadow-lg hover:bg-gray-100 transition px-6 py-2.5 gap-x-2"
              disabled={isLoading}
            >
              <img src={Google} alt="Google" className="h-8"/>
              {isLoading ? "Logging In..." : "Log In with Google"}
            </button>
          </div>

          <p className="flex justify-center items-center gap-x-2 text-white font-light relative bottom-7">
            Don't Have an Account? 
            <Link to='/regist' className="text-white font-normal hover:underline">Register Here.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}