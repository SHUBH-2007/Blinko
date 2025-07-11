'use client';
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        appearance={{}}
        afterSignIn={() => router.push("/chat")}
      />
    </div>
  );
}
