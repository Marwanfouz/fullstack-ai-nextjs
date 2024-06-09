import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h1 className="text-4xl mb-12">Journals</h1>
      <div className="my-8"></div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntry />
        {entries.map((entry) =>
        (<EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}

export default JournalPage