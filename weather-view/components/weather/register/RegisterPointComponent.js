import { useState } from "react";
import { useSWRConfig } from "swr";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

import { addGeographicPoint } from "../../../grpc/api/GeographicPointApi";
import MapboxComponent from "./MapboxComponent";

export default function RegisterPointComponent(prop) {
  const { mutate } = useSWRConfig();

  const [markerPin, setMarkerPin] = useState({
    latitude: prop?.initialGeographicPoint?.latitude,
    longitude: prop?.initialGeographicPoint?.longitude,
  });
  const [pointName, setPointName] = useState(prop.pointName);
  const [regsiterError, setRegsiterError] = useState(false);

  const handlePointNameChange = (event) => {
    setPointName(event.target.value);
  };

  async function onClickRegsiterButton() {
    const result = await mutate(
      "/GeographicPointService/AddGeographicPoint",
      addGeographicPoint(pointName, markerPin.latitude, markerPin.longitude)
    );
    if (result.success) {
      setPointName("");
      setRegsiterError(false);
      prop.onUpdateData();
    } else {
      setRegsiterError(true);
    }
  }

  function onCancel() {
    setPointName("");
    setRegsiterError(false);
    prop.onCLoseModal();
  }

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: 570,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={prop.openModal}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              style={{ width: "100%" }}
            >
              <Grid sx={{ mt: 1 }}>地点登録</Grid>
              <Grid>
                <IconButton>
                  <CloseIcon onClick={prop.onCLoseModal} />
                </IconButton>
              </Grid>
            </Grid>
          </Typography>
          <Box sx={{ mt: 2 }}>
            <MapboxComponent
              markerPin={markerPin}
              setMarkerPin={setMarkerPin}
            />
          </Box>
          <Box sx={{ m: "auto", mt: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="地点名"
              defaultValue={pointName}
              onChange={handlePointNameChange}
            />
          </Box>
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              disabled={!pointName || !markerPin}
              onClick={onClickRegsiterButton}
            >
              登録する
            </Button>
            {regsiterError && (
              <Box sx={{ mt: 2, color: "error.main" }}>
                登録時にエラーが発生しました
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
