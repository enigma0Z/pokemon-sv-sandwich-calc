export default function sandwich (props: { ingredients: string[]; seasonings: string[]; powers: string[] }) {
  const ingredients: string[] = props.ingredients
  const seasonings: string[] = props.seasonings
  const powers: string[] = props.powers

  return (
    <>
      <a href={`/?ingredients=${ingredients.join(',')}&seasonings=${seasonings.join(',')}`}>
        <div>
          {ingredients.map((ingredient) => <span>{ingredient}</span>)}
        </div>
        <div>
          {seasonings.map((seasoning) => <span>{seasoning}</span>)}
        </div>
        <div>
          {powers.map((power) => <span>{power}</span>)}
        </div>
      </a>
    </>
  )
}