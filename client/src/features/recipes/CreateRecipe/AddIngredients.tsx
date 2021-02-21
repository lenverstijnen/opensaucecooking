import React from "react"
import { makeStyles, Typography, Button } from "@material-ui/core"
import { ICreateRecipeState, initialIngredient } from "./CreateRecipe"
import Input from "../../../common/Input"
import AlignRight from "../../../common/AlignRight"
import { Add } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root: {},
}))

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
  const classes = useStyles()

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
      <AlignRight>
        <Button
          onClick={addIngredient}
          color="secondary"
          size="small"
          startIcon={<Add />}
        >
          Add ingredient
        </Button>
      </AlignRight>
    </>
  )
}

export default AddIngredients
