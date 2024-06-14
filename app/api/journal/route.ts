import { analyze } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  try {
    const user = await getUserFromClerkID()

    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        content: 'Write about your day!',
      },
    })

    const analysis = await analyze(entry.content)

    await prisma.entryAnalysis.create({
      data: {
        entryId: entry.id,
        userId: entry.userId,
        ...analysis,
      }
    })

    revalidatePath('/journal')

    return NextResponse.json({ data: entry })
  } catch (error) {
    console.error(error)
  }
}
