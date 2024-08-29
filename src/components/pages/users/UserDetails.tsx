import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { userId } = useParams<string>();

  return <div>User page #{userId}</div>;
};

export default UserDetails;
