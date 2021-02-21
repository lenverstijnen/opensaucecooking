import React from "react";
import Input from "../Input";

interface Props {
  className?: string;
}

export const AddComment: React.FC<Props> = ({ className }) => {
  return <Input className={className} />;
};
