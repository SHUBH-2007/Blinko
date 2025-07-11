'use client';
import { useAuth, useUser } from '@clerk/nextjs';

export default function ChatPage() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return null; // Optional safeguard

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🔐 Welcome to Blinko Chat</h1>
      <p className="mt-2">This is a secure chat app, built for Indians.</p>

    </div>
  );
}
