import { useParams } from "react-router-dom";

export const Recipe = () => {
  const { id } = useParams<{ id?: string }>();
  return <div>Recipe detail {id}</div>;
};
