import { Typography } from "@material-ui/core"
import React from "react"
import AddButton from "../../../common/AddButton"
import Input from "../../../common/Input"
import { ICreateRecipeState, initialIngredient } from "./CreateRecipe"

interface Props {
  state: ICreateRecipeState
  errors: any //TODO: define type
  handleChange: () => void
  setState: React.Dispatch<React.SetStateAction<ICreateRecipeState>>
}

const AddIngredients: React.FC<Props> = ({
  setState,
  state,
  handleChange,
  errors,
}) => {
  const addIngredient = () => {
    setState({
      ...state,
      ingredients: [...state.ingredients, initialIngredient],
    })
  }

  return (
    <>
      <h3>Ingredients</h3>
      {state.ingredients.map((ingredient, i) => (
        <div key={i}>
          <Typography color="primary" variant="caption">
            Ingredient {i + 1}
          </Typography>
          <Input
            name="name"
            onChange={handleChange}
            label="Ingredient name"
            value={state.ingredients[i].name}
            error={state.ingredients?.[i]?.name}
          />
          <Input
            name="quantity"
            onChange={handleChange}
            label="Quantity"
            value={state.ingredients[i].quantity as string}
            error={errors.ingredients?.[i]?.quantity}
          />
          <Input
            name="unit"
            onChange={handleChange}
            label="Unit"
            value={state.ingredients[i].unit}
            error={errors.ingredients?.[i]?.unit}
          />
        </div>
      ))}
      <AddButton onClick={addIngredient} label="Add Ingredient" />
    </>
  )
}

export default AddIngredients
