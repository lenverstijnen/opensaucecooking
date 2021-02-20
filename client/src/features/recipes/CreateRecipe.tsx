import { Button, Container, Typography } from "@material-ui/core"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createRecipe, recipeService, useRecipe } from "./state"
import Input from "../../common/Input"
import { Add } from "@material-ui/icons"
import AlignRight from "../../common/AlignRight"

export enum UnitEnum {
  gram = "gram",
  liter = "liter",
  stuks = "stuks",
}

export interface IIngredient {
  name: string
  quantity: number | string
  unit: UnitEnum
}

interface IState {
  name: string
  ingredients: IIngredient[]
  steps: string[]
}

const initialIngredient = { name: "", quantity: "", unit: UnitEnum.gram }

const initialState: IState = {
  name: "",
  ingredients: [initialIngredient],
  steps: [],
}

export const CreateRecipe = () => {
  const { goBack } = useHistory()
  const { id } = useParams<{ id?: string }>()
  const recipe = useRecipe(id)
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState<{ [k: string]: any }>({})
  const isNew = !recipe

  const handleChange = () => {}

  const addIngredient = () => {
    setState({
      ...state,
      ingredients: [...state.ingredients, initialIngredient],
    })
  }

  const validateForm = () => {
    // TODO: validate input
  }

  const handleSave = () => {
    validateForm()

    if (isNew) {
      handleCreate()
    } else {
      handleEdit()
    }

    goBack()
  }

  const handleCreate = async () => {
    const newRecipe = createRecipe({ ...state })
    recipeService.create(newRecipe)
  }

  const handleEdit = () => {
    if (!id) throw new Error("No id found.")

    recipeService.update({
      _id: id,
      name: state.name,
    })
  }

  return (
    <Container>
      <h2>{isNew ? "Create Recipe" : "Edit Recipe"}</h2>
      <form noValidate autoComplete="off">
        <Input
          name="name"
          onChange={handleChange}
          label="Name"
          value={state.name}
          error={errors.name}
        />

        <h3>Ingredients</h3>
        {state.ingredients.map((ingredient, i) => (
          <>
            <Typography color="secondary" variant="caption">
              Ingredient {i + 1}
            </Typography>
            <Input
              name="name"
              onChange={handleChange}
              label="Ingredient mame"
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
          </>
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

        <h3>Steps</h3>

        <Button
          // className={classes.btn}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </form>
    </Container>
  )
}
