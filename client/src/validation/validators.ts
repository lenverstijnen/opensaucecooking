import * as yup from "yup"

export const validators = {
  shortString: yup.string().max(255, "Use a maximum of 500 characters"),
  mediumString: yup.string().max(500, "Use a maximum of 500 characters"),
}
