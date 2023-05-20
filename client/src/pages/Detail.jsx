import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default Detail;
