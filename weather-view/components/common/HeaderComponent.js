import { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

import { AuthContext } from "../auth/AuthProvider";
import { setAuthTokenLocalStorage } from "../../util/AuthTokenUtil";

export default function HeaderComponent() {
  const { authInfo, setAuthInfo } = useContext(AuthContext);

  function onLogout() {
    setAuthTokenLocalStorage(undefined);
    setAuthInfo(undefined);
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            天気の確認
          </Typography>
          {authInfo && (
            <Button color="inherit" onClick={onLogout}>
              ログアウト
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
