import React from "react"
import { makeStyles, Button } from "@material-ui/core"
import AlignRight from "../../../common/AlignRight"
import Input from "../../../common/Input"
import { Add } from "@material-ui/icons"
import { ICreateRecipeState } from "./CreateRecipe"

const useStyles = makeStyles((theme) => ({
  root: {},
}))

interface Props {
  state: ICreateRecipeState
  errors: any //TODO: define type
  handleChange: () => void
  setState: React.Dispatch<React.SetStateAction<ICreateRecipeState>>
}

const AddSteps: React.FC<Props> = ({
  state,
  handleChange,
  setState,
  errors,
}) => {
  const classes = useStyles()

  const addStep = () => setState({ ...state, steps: [...state.steps, ""] })

  return (
    <>
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
    </>
  )
}

export default AddSteps
