import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/supabase/supabase-client";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const isSignIn = location.pathname === "/sign-in";

  useEffect(() => {
    document.title = isSignIn ? "Sign In | Vocabsaga" : "Sign Up | Vocabsaga";
  }, [isSignIn]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignIn) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Error signing in: ", signInError.message);
      }
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log({ data });

      if (signUpError) {
        console.error("Error signing up: ", signUpError.message);
      }
    }
  };

  return (
    <section className="min-h-[80vh] flex">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r-0 md:border-r-[1px]">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
            {!isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your name" />
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
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="********"
                />
              </div>
            )}

            <Button type="submit" className="w-full cursor-pointer">
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
      <div className="w-1/2 hidden md:flex items-center justify-center p-8">
        <blockquote className="text-3xl text-center playfair-display-normal">
          “It is our choices, Harry, that show what we truly are, far more than
          our abilities.”
        </blockquote>
      </div>
    </section>
  );
}
