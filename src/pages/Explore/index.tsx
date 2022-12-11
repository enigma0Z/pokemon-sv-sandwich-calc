import { useEffect } from 'react'

export default function Explore() {
  useEffect(() => {
    document.window.title = "Sandwich Calculator: Explore"
  }, [])
  return (
    <>
      <div className="section">
        <h2>COMING SOON</h2>
      </div>
    </>
  )
}