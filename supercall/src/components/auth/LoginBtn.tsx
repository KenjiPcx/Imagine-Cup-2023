import { Button } from "@hope-ui/solid";
import { useMsal } from "./AuthProvider";
import { loginRequest } from "../../scripts/authConfig";

export default function LoginBtn() {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginPopup(loginRequest);
  };

  return (
    <Button mr="$3" size="sm" onClick={handleLogin}>
      Microsoft Login
    </Button>
  );
}
