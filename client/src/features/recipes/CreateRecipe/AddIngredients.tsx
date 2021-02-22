import { IconButton, MenuItem, Typography } from "@material-ui/core"
import { DeleteForeverOutlined } from "@material-ui/icons"
import { Field, FieldArray } from "formik"
import React from "react"
import { UnitEnum } from "../../../common/enums/UnitEnum"
import AddButton from "../../../common/formComponents/AddButton"
import SectionWrapper from "../../../common/SectionWrapper"
import { ICreateRecipeState, initialIngredient } from "./CreateRecipe"
import Input from "./Input"
import Select from "./Select"

interface Props {
  values: ICreateRecipeState
}
const unitItems = [
  { value: UnitEnum.gram, label: "Gram" },
  { value: UnitEnum.liter, label: "Liter" },
  { value: UnitEnum.pieces, label: "Pieces" },
]

const AddIngredients: React.FC<Props> = ({ values }) => {
  return (
    <>
      <h3>Ingredients</h3>
      <FieldArray name="ingredients">
        {(arrayHelpers) => (
          <div>
            {values.ingredients.map((ingredient, index: number) => (
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
                  <Typography color="primary" variant="caption">
                    Ingredient {index + 1}
                  </Typography>
                  <Field
                    name={`ingredients.${index}.name`}
                    label="Ingredient name"
                    as={Input}
                  />
                  <Field
                    name={`ingredients.${index}.quantity`}
                    label="Quantity "
                    as={Input}
                  />
                  <Field
                    label="Unit"
                    type="select"
                    name={`ingredients.${index}.unit`}
                    as={Select}
                  >
                    {unitItems.map((item) => (
                      <MenuItem value={item.value} key={"" + Math.random()}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Field>
                </SectionWrapper>
              </div>
            ))}

            <AddButton
              label="Add Ingredient"
              onClick={() => arrayHelpers.push(initialIngredient)}
            />
          </div>
        )}
      </FieldArray>
    </>
  )
}

export default AddIngredients
