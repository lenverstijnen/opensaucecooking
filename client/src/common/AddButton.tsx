import { Button } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import React from "react"
import AlignRight from "./AlignRight"

interface Props {
  onClick: () => void
  label: string
}

const AddButton: React.FC<Props> = ({ onClick, label }) => (
  <AlignRight>
    <Button
      onClick={onClick}
      color="secondary"
      size="small"
      startIcon={<Add />}
    >
      {label}
    </Button>
  </AlignRight>
)

export default AddButton
