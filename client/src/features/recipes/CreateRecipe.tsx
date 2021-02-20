import { Button, Container, TextField } from "@material-ui/core"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createRecipe, recipeService, useRecipe } from "./state"

export const CreateRecipe = () => {
  const { id } = useParams<{ id?: string }>()
  const recipe = useRecipe(id)
  const [name, setName] = useState(recipe?.name || "")
  const { goBack } = useHistory()
  const isNew = !recipe

  const validateForm = () => {
    if (!name) {
      throw new Error("Form is invalid")
    }
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
    const newRecipe = createRecipe({ name })
    recipeService.create(newRecipe)
  }

  const handleEdit = () => {
    if (!id) throw new Error("No id found.")

    recipeService.update({
      _id: id,
      name,
    })
  }

  return (
    <Container>
      <h2>{isNew ? "Create Recipe" : "Edit Recipe"}</h2>
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </form>
    </Container>
  )
}
