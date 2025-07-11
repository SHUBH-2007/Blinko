'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to Blinko 💬</h1>
      <Link href="/sign-in" className="text-blue-600 underline">Sign In</Link>
      <Link href="/sign-up" className="text-green-600 underline">Sign Up</Link>
    </main>
  );
}
