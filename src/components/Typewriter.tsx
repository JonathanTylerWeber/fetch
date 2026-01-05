import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function Typewriter() {
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lettersShown, setLettersShown] = useState('')

  const handleClick = () => {
    if (!loading) {
      setLettersShown('')
      setWord('')
      setError(null)
      fetchUrl()
    }
  }

  async function fetchUrl() {
    const url = 'https://random-word-api.herokuapp.com/word'

    try {
      setLoading(true)
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error: ${res.status}`)
      const data: string[] = await res.json()
      setWord(data[0] ?? '')
      console.log(data[0])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!word) return
    let cancelled = false
    let i = 0
    let id: number

    const tick = () => {
      if (cancelled) return

      i += 1
      setLettersShown(word.slice(0, i))

      id = setTimeout(tick, 300)
    }

    id = setTimeout(tick, 300)

    return () => {
      cancelled = true
      window.clearTimeout(id)
    }
  }, [word])

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <Button onClick={handleClick}>
        {loading ? 'Loading...' : 'Click for word'}
      </Button>
      <p className='pt-10 h-10'>{lettersShown}</p>
      <p className='text-red-500'>{error}</p>
    </div>
  )
}
