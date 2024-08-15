import { useEffect, useState } from "react";
interface User {
  id: string;
  name: string;
  avatarURL?: string;
  username?: string;
  email: string;
}
const useUserDetails = () => {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const rawUser = localStorage.getItem("medium-user");
    if (rawUser !== null) {
      setUser(JSON.parse(rawUser));
    }
  }, []);

  return user;
};
export default useUserDetails;
