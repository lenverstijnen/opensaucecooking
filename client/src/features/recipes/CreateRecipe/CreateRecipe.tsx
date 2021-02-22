import { Container, makeStyles, Button } from "@material-ui/core"
import { Field, Form, Formik } from "formik"
import { useHistory, useParams } from "react-router-dom"
import { UnitEnum } from "../../../common/enums/UnitEnum"
import { useRecipe } from "../state"
import { recipeService } from "../state/recipe.service"
import * as yup from "yup"
import AddIngredients from "./AddIngredients"
import AddSteps from "./AddSteps"
import Input from "./Input"
import AddPictures from "./AddPictures"
import SectionWrapper from "../../../common/SectionWrapper"

const schema = yup.object({
  name: yup.string().required(),
  ingredients: yup.array().of(
    yup.object({
      name: yup.string().required("This field is required"),
      quantity: yup.number().required("This field is required"),
      unit: yup
        .string()
        .matches(/gram|liter|pieces/)
        .required("This field is required"),
    })
  ),
  steps: yup.array().of(yup.string().required("This field is required")),
})

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "10px 0",
  },
}))

export type ErrorObj = Record<string, any>

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
  const isNew = !recipe

  const handleSave = () => {
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
    // if (!id) throw new Error("No id found.")
    // recipeService.update({
    //   _id: id,
    //   name: state.name,
    // })
  }

  return (
    <Container>
      <h2>{isNew ? "Create Recipe" : "Edit Recipe"}</h2>
      <Formik
        validationSchema={schema}
        initialValues={initialState}
        onSubmit={(data) => handleSave()}
      >
        {({ values, errors }) => (
          <>
            <Form>
              <SectionWrapper>
                <Field label="Recipe name" name="name" as={Input} />
              </SectionWrapper>
              <AddIngredients values={values} />
              <AddSteps values={values} />
              <AddPictures />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                {isNew ? "create" : "update"} recipe
              </Button>
            </Form>
            <pre style={{ color: "blue" }}>
              {JSON.stringify(values, null, 2)}
            </pre>
            <pre style={{ color: "red" }}>
              {JSON.stringify(errors, null, 2)}
            </pre>
          </>
        )}
      </Formik>
    </Container>
  )
}
