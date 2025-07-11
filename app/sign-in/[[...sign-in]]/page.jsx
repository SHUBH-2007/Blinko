// app/sign-in/[[...rest]]/page.jsx
import { SignIn } from "@clerk/nextjs";
import { auth }   from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  // If the user is already logged in, bypass the form
  const { userId } = auth();
  if (userId) redirect("/chat");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn
        path="/sign-in"
        routing="path"
        afterSignInUrl="/chat"
        afterSignUpUrl="/chat"
      />
    </div>
  );
}
