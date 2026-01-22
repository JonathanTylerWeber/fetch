export default function EndlessScroll() {
  const url = 'https://picsum.photos/200'

  async function fetchImages() {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error: ${res.status}`)
    } catch (error) {
      console.error(`Fetch Error: ${error}`)
    }
  }

  return (
    <div>
      <div></div>
    </div>
  )
}
