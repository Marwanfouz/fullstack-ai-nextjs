'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { JournalEntry } from '@prisma/client'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return
      setIsSaving(true)
      const update = await updateEntry(entry.id, value)
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isSaving && <div>....loading</div>}
      <textarea
        className="w-full h-full p-8 text-xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
