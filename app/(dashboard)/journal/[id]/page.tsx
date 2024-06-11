import Editor from '@/components/Editor'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: string) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

interface Props {
  params: {
    id: string
  }
}

const JournalEditorPage = async ({ params }: Props) => {
  const entry = await getEntry(params.id)
  return (
    <div className='"w-full h-full'>
      <h1>{params.id}</h1>
      <Editor entry={entry} />
    </div>
  )
}

export default JournalEditorPage
