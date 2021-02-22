import { Button, Container, makeStyles } from "@material-ui/core"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { UnitEnum } from "../../../common/enums/UnitEnum"
import Input from "../../../common/formComponents/Input"
import { createRecipe, useRecipe } from "../state"
import { recipeService } from "../state/recipe.service"
import AddIngredients from "./AddIngredients"
import AddPictures from "./AddPictures"
import AddSteps from "./AddSteps"

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "10px 0",
  },
}))

export interface IIngredient {
  name: string
  quantity: number | string
  unit: UnitEnum
}

export interface ICreateRecipeState {
  name: string
  ingredients: IIngredient[]
  steps: string[]
}

export const initialIngredient = {
  name: "",
  quantity: "",
  unit: UnitEnum.gram,
}

const initialState: ICreateRecipeState = {
  name: "",
  ingredients: [{ ...initialIngredient }],
  steps: [""],
}

export const CreateRecipe = () => {
  const classes = useStyles()
  const { goBack } = useHistory()
  const { id } = useParams<{ id?: string }>()
  const recipe = useRecipe(id)
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState<{ [k: string]: any }>({})
  const isNew = !recipe

  const handleChange = () => {}

  const validateForm = () => {
    // TODO: validate input
    setErrors({})
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
    // const newRecipe = createRecipe({ ...state })
    // recipeService.create(newRecipe)
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
        <AddIngredients state={state} setState={setState} errors={errors} />
        <AddSteps
          state={state}
          setState={setState}
          handleChange={handleChange}
          errors={errors}
        />
        <AddPictures />
        <Button
          className={classes.btn}
          fullWidth
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
