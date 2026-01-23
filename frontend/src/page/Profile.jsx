import { useAuthstore } from "../store/useAuth.store";

const Profile = () => {
  const { authUser } = useAuthstore()
  return <div>Profile</div>;
};

export default Profile;
