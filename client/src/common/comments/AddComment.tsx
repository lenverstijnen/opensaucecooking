import React from "react"
import Input from "../formComponents/Input"
interface Props {
  className?: string
}

export const AddComment: React.FC<Props> = ({ className }) => {
  return <Input className={className} />
}
