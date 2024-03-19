import { db } from "@/lib/drizzle";
import { $posts } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    let { postId, editorState } = body;
    if (!editorState || !postId) {
      return new NextResponse("Missing editorState or postId", { status: 400 });
    }

    postId = parseInt(postId);
    const posts = await db.select().from($posts).where(eq($posts.id, postId));
    if (posts.length != 1) {
      return new NextResponse("failed to update", { status: 500 });
    }

    const post = posts[0];
    if (post.editorState !== editorState) {
      await db
        .update($posts)
        .set({
          editorState
        })
        .where(eq($posts.id, postId));
    }

    revalidatePath("/api/journal/journalPosts");

    return NextResponse.json(
      {
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false
      },
      { status: 500 }
    );
  }
}