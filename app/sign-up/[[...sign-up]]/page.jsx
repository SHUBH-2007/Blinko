'use client';
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        appearance={{}}
        afterSignUp={() => router.push("/chat")}
      />
    </div>
  );
}
