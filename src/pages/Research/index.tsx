import { useEffect, useState } from 'react'
import PowerRequirementComponent from '../../components/PowerRequirementComponent'
import PowerSelect from '../../components/PowerSelect'
import { powerRequirements } from '../../data/calc'

export default function Research() {
  useEffect(() => {
    document.title = "Sandwich Calculator: Research"
  }, [])

  const [power, setPower]: [string | undefined, (value: string | undefined) => void] = useState()
  const [type, setType]: [string | undefined, (value: string | undefined) => void] = useState()
  const [level, setLevel]: [number | undefined, (value: number | undefined) => void] = useState()

  console.log(power, type, level)

  let GuideElement: JSX.Element[] = []

  if (power && (type || power === 'Egg') && level) GuideElement = [
    <PowerRequirementComponent requirements={powerRequirements([{name: power, type: type, level: level}])} />
  ]

  return (
    <>
      <PowerSelect onChange={(power, type, level) => {
        setPower(power)
        setType(type)
        setLevel(level)
      }} />
      { GuideElement }
    </>
  )
}