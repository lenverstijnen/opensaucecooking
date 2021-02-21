import React from "react"
import AddButton from "../../../common/AddButton"
import Input from "../../../common/Input"
import { ICreateRecipeState } from "./CreateRecipe"

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
      <AddButton
        onClick={addStep}
        label={`Add step ${state.steps.length + 1}`}
      />
    </>
  )
}

export default AddSteps
