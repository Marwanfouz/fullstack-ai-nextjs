import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const { content } = await request.json()
  const user = await getUserFromClerkID()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      },
    },
    data: {
      content,
    }
  })
  return NextResponse.json({data: updatedEntry})
}
