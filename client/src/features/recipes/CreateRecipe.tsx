import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../store";
import {
  addRecipe,
  createRecipeModel,
  recipeUpdated,
  selectRecipeById,
} from "./recipeSlice";

export const CreateRecipe = () => {
  const { id } = useParams<{ id?: string }>();
  const recipe = useSelector((state: RootState) =>
    id ? selectRecipeById(state, id) : undefined
  );
  const [name, setName] = useState(recipe?.name || "");
  const { goBack } = useHistory();
  const { getAccessTokenSilently, user } = useAuth0();
  const isNew = !recipe;

  const dispatch = useDispatch();

  const validateForm = () => {
    if (!name) {
      throw new Error("Form is invalid");
    }
  };

  const handleSave = () => {
    validateForm();

    if (isNew) {
      handleCreate();
    } else {
      handleEdit();
    }

    goBack();
  };

  const handleCreate = async () => {
    const token = await getAccessTokenSilently();
    const userId = user?.sub;
    const newRecipe = createRecipeModel({ userId, name });
    dispatch(addRecipe([token, newRecipe]));
  };

  const handleEdit = () => {
    if (!id) throw new Error("No id found.");

    dispatch(
      recipeUpdated({
        _id: id,
        name,
      })
    );
  };

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
  );
};
