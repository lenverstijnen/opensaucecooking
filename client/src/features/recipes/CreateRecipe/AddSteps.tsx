import { IconButton } from "@material-ui/core"
import { DeleteForeverOutlined } from "@material-ui/icons"
import { Field, FieldArray } from "formik"
import React from "react"
import AddButton from "../../../common/formComponents/AddButton"
import SectionWrapper from "../../../common/SectionWrapper"
import { ICreateRecipeState } from "./CreateRecipe"
import Input from "./Input"

interface Props {
  values: ICreateRecipeState
}

const AddSteps: React.FC<Props> = ({ values }) => {
  return (
    <>
      <h3>Steps</h3>
      <FieldArray name="steps">
        {(arrayHelpers) => (
          <div>
            {values.steps.map((ingredient, index: number) => (
              <div key={index}>
                <SectionWrapper>
                  {index > 0 && (
                    <IconButton
                      style={{ float: "right" }}
                      size="small"
                      color="primary"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <DeleteForeverOutlined color="error" />
                    </IconButton>
                  )}
                  <Field
                    name={`steps[${index}]`}
                    label={`Step ${index + 1}`}
                    as={Input}
                  />
                </SectionWrapper>
              </div>
            ))}
            <AddButton label="Add Step" onClick={() => arrayHelpers.push("")} />
          </div>
        )}
      </FieldArray>
    </>
  )
}

export default AddSteps
