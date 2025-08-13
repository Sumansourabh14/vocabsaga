import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "react-router";

export default function AuthPage() {
  const location = useLocation();
  const isSignIn = location.pathname === "/sign-in";

  return (
    <section className="min-h-[80vh] flex">
      {/* Left - Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          <form className="space-y-4">
            {!isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your name" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
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

            <Button type="submit" className="w-full">
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
