import { Button, Container, Typography, makeStyles } from "@material-ui/core"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createRecipe, recipeService, useRecipe } from "./state"
import Input from "../../common/Input"
import { Add, AddAPhotoTwoTone } from "@material-ui/icons"
import AlignRight from "../../common/AlignRight"

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "10px 0",
  },
  images: {
    display: "flex",

    flexWrap: "wrap",
  },
  tumbnail: {
    margin: 5,
  },
}))

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
  steps: [""],
}

export const CreateRecipe = () => {
  const classes = useStyles()
  const { goBack } = useHistory()
  const { id } = useParams<{ id?: string }>()
  const recipe = useRecipe(id)
  const [state, setState] = useState(initialState)
  const [images, setImages] = useState<File[]>([])
  const [errors, setErrors] = useState<{ [k: string]: any }>({})
  const isNew = !recipe

  const handleChange = () => {}

  const addIngredient = () => {
    setState({
      ...state,
      ingredients: [...state.ingredients, initialIngredient],
    })
  }

  const addStep = () => setState({ ...state, steps: [...state.steps, ""] })

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
        <h3>Steps</h3>
        {state.steps.map((step, i) => (
          <Input
            key={i}
            name={`Step ${i + 1}`}
            onChange={handleChange}
            label={`Step ${i + 1}`}
            value={state.steps[i]}
            error={errors.steps?.[i]}
          />
        ))}
        <AlignRight>
          <Button
            onClick={addStep}
            color="secondary"
            size="small"
            startIcon={<Add />}
          >
            Add step
          </Button>
        </AlignRight>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
        />
        <Button
          endIcon={<AddAPhotoTwoTone />}
          className={classes.btn}
          fullWidth
          color="primary"
          component="label"
        >
          Upload Images
          <input
            onChange={(e) => setImages(Array.from(e.target.files!))}
            accept="image/*"
            type="file"
            multiple
            hidden
          />
        </Button>
        {images && (
          <div className={classes.images}>
            {images.map((file, i) => (
              <img
                className={classes.tumbnail}
                key={i}
                src={URL.createObjectURL(file)}
                alt="foo"
                width={100}
                height={100}
              />
            ))}
          </div>
        )}

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
