import { Typography } from "@material-ui/core"
import React, { ChangeEvent, EventHandler, SyntheticEvent } from "react"
import { UnitEnum } from "../../../common/enums/UnitEnum"
import AddButton from "../../../common/formComponents/AddButton"
import Input from "../../../common/formComponents/Input"
import Select from "../../../common/formComponents/Select"
import { ErrorObj, ICreateRecipeState, initialIngredient } from "./CreateRecipe"

interface Props {
  state: ICreateRecipeState
  errors: ErrorObj
  setState: React.Dispatch<React.SetStateAction<ICreateRecipeState>>
}

const unitItems = [
  { value: UnitEnum.gram, label: "Gram" },
  { value: UnitEnum.liter, label: "Liter" },
  { value: UnitEnum.pieces, label: "Pieces" },
]

const AddIngredients: React.FC<Props> = ({ setState, state, errors }) => {
  const addIngredient = () => {
    setState({
      ...state,
      ingredients: [...state.ingredients, { ...initialIngredient }],
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const ingredients: any = [...state.ingredients]
    ingredients[i][e.target.name] = e.target.value
    setState({ ...state, ingredients })
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
            label="Ingredient name"
            value={state.ingredients[i].name}
            error={errors.ingredients?.[i]?.name}
          />
          <Input
            name="quantity"
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
            label="Quantity"
            value={state.ingredients[i].quantity as string}
            error={errors.ingredients?.[i]?.quantity}
          />
          <Select
            name="unit"
            noEmpty
            items={unitItems}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
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
