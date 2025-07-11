import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await req.json();
  const {
    content = null,
    mediaUrl = null,
    mediaType = null,
    receiverId,
  } = body;

  if (!receiverId || (!content && !mediaUrl)) {
    return new Response("Bad Request", { status: 400 });
  }
  const sender = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!sender) return new Response("Sender not found", { status: 401 });

  const message = await prisma.message.create({
    data: {
      content,
      mediaUrl,
      mediaType,
      senderId: sender.id,
      receiverId,
    },
  });

  return new Response(JSON.stringify(message), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET() {
    const {userId} = auth();
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const {searchParams} = new URL(req.url);
    const withId = searchParams.get("with");
    if (!withId) return new Response("Missing ?with=",{status:400});

    const me = await prisma.user.findUnique({where:{clerkId:userId}});
    if (!me) return new Response("User not found", { status: 401 });

    const messages = await prisma.message.findMany({
        where:{
            OR:[
                {senderId:me.id,receiverId:withId},
                {senderId:withId,receiverId:me.id},
            ],
        },
        orderBy:{createdAt:"asc"}, 
    });
    return new Response(JSON.stringify(messages), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}