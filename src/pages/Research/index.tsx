import { useEffect } from 'react'
import { Ingredients, Seasonings } from '../../data/Cookbooks'

export default function Research() {
  useEffect(() => {
    document.title = "Sandwich Calculator: Research"
  }, [])

  console.log(Ingredients.length)
  console.log(Seasonings.length)

  return (
    <>

    </>
  )
}