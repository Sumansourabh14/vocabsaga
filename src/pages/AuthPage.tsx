import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/supabase/supabase-client";
import type { Quote } from "@/types";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const data: Quote = {
  _id: "6640a798e14c6532bcfb00c6",
  quote: "People in their right minds never take pride in their talents.",
  book: "To Kill a Mockingbird",
  author: "Harper Lee",
};

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { session } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const isSignIn = location.pathname === "/sign-in";

  useEffect(() => {
    document.title = isSignIn ? "Sign In | Vocabsaga" : "Sign Up | Vocabsaga";
  }, [isSignIn]);

  useEffect(() => {
    if (session) {
      navigate("/story", { replace: true });
    }
  }, [session]);

  const clearStates = () => {
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setErrorMessage("");
    e.preventDefault();

    if (isSignIn) {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInData?.session) {
        navigate(`/story`);
      }

      if (signInError) {
        console.error("Error signing in: ", signInError.message);
        setErrorMessage(signInError.message);
        clearStates();
        return;
      }
    } else {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        console.error("Error signing up: ", signUpError.message);
        setErrorMessage(signUpError.message);
        clearStates();
        return;
      }

      if (signUpData.user) {
        const { data, error: insertError } = await supabase
          .from("profiles")
          .insert([
            {
              id: signUpData.user.id,
              name,
              email,
            },
          ])
          .select()
          .single();

        if (data) {
          navigate(`/sign-in`);
          clearStates();
        }

        if (insertError) {
          console.error("Error storing user: ", insertError.message);
          setErrorMessage(insertError.message);
          clearStates();
          return;
        }
      }
    }
    clearStates();
  };

  if (session) return null;

  return (
    <section className="min-h-[80vh] flex">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r-0 md:border-r-[1px]">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
            {errorMessage && (
              <p className="text-center text-red-400">Error: {errorMessage}</p>
            )}
            {!isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="something strong"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={email.length === 0 || password.length === 0 || loading}
            >
              {loading && <Loader2 className="animate-spin" />}
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <p className="text-sm">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link to={isSignIn ? "/sign-up" : "/sign-in"} className="underline">
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Quote */}
      <div className="w-1/2 hidden md:flex items-center justify-center p-8 ">
        <div className="flex flex-col gap-8 items-center">
          <blockquote className="text-3xl text-center playfair-display-normal">
            “{data.quote}”
          </blockquote>
          {(data.book || data.author) && (
            <p className="text-sm text-muted-foreground">
              — <strong>{data.book}</strong>
              {data.author ? `, ${data.author}` : ""}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
