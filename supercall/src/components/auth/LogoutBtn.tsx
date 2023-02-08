import { Button } from "@hope-ui/solid";
import { useMsal } from "./AuthProvider";

export default function LogoutBtn() {
  const { instance } = useMsal();
  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <Button mr="$3" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
}
