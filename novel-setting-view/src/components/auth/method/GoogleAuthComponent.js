import { Button } from "primereact/button";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

function GoogleAuthComponentLogin(prop) {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      prop.setGoogleAuthCode(codeResponse);
    },
    flow: "auth-code",
    scope: "email profile openid", // scopeはスペース区切り
  });

  return (
    <Button rounded onClick={login} disabled={prop.isLoading}>
      Google認証
    </Button>
  );
}

export default function GoogleAuthComponent(prop) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <GoogleAuthComponentLogin {...prop} />
    </GoogleOAuthProvider>
  );
}
