import React, { ChangeEvent } from "react"
import AddButton from "../../../common/formComponents/AddButton"
import Input from "../../../common/formComponents/Input"
import { ErrorObj, ICreateRecipeState } from "./CreateRecipe"

interface Props {
  state: ICreateRecipeState
  errors: ErrorObj
  setState: React.Dispatch<React.SetStateAction<ICreateRecipeState>>
}

const AddSteps: React.FC<Props> = ({ state, setState, errors }) => {
  const addStep = () => setState({ ...state, steps: [...state.steps, ""] })

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const steps = [...state.steps]
    steps[i] = e.target.value
    setState({ ...state, steps })
  }

  return (
    <>
      <h3>Steps</h3>
      {state.steps.map((step, i) => (
        <Input
          key={i}
          name={`Step ${i + 1}`}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
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
