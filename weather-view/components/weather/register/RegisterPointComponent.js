import { useState } from "react";
import { useSWRConfig } from "swr";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

import {
  addGeographicPoint,
  updateGeographicPoint,
} from "../../../grpc/api/GeographicPointApi";
import MapboxComponent from "./MapboxComponent";

export default function RegisterPointComponent(prop) {
  const { mutate } = useSWRConfig();

  const [markerPin, setMarkerPin] = useState({
    latitude: prop?.initialGeographicPoint?.latitude,
    longitude: prop?.initialGeographicPoint?.longitude,
  });
  const [pointName, setPointName] = useState(prop.pointName);
  const [displayOrder, setDisplayOrder] = useState(prop.displayOrder);
  const [registerError, setRegisterError] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const handlePointNameChange = (event) => {
    setPointName(event.target.value);
  };

  const handleDisplayOrderChange = (event) => {
    setDisplayOrder(parseInt(event.target.value));
  };

  async function onClickRegisterButton() {
    let result = undefined;
    if (!prop.pointId) {
      result = await mutate(
        "/GeographicPointService/AddGeographicPoint",
        addGeographicPoint(
          pointName,
          markerPin.latitude,
          markerPin.longitude,
          displayOrder
        )
      );
    } else {
      result = await mutate(
        "/GeographicPointService/UpdateGeographicPoint",
        updateGeographicPoint(
          prop.pointId,
          pointName,
          markerPin.latitude,
          markerPin.longitude,
          displayOrder
        )
      );
    }

    if (result?.success) {
      if (!prop.pointId) {
        setPointName("");
        setDisplayOrder(undefined);
      }
      setRegisterError(false);
      prop.onUpdateData();
    } else {
      setRegisterError(true);
    }
  }

  function onClickDeleteButton() {
    setDisplayDeleteModal(true);
  }

  function closeDelete() {
    setDisplayDeleteModal(false);
  }

  function commitDelete() {
    setDisplayDeleteModal(false);
    prop.onUpdateData();
  }

  function onCancel() {
    setPointName(prop.pointName);
    setDisplayOrder(prop.displayOrder);
    setRegisterError(false);
    prop.onCloseModal();
  }

  function checkEnableRegister() {
    return pointName && markerPin && displayOrder && displayOrder > 0;
  }

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: 600,
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
                  <CloseIcon onClick={prop.onCloseModal} />
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
          <Box sx={{ m: "auto", mt: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="表示順"
              placeholder="1以上の数字を入力"
              type="number"
              defaultValue={displayOrder}
              onChange={handleDisplayOrderChange}
            />
          </Box>
          <Box textAlign="center" sx={{ mt: 4 }}>
            {!prop.pointId && (
              <Button
                variant="contained"
                disabled={!checkEnableRegister()}
                onClick={onClickRegisterButton}
              >
                登録する
              </Button>
            )}
            {prop.pointId && (
              <Grid container direction="row" textAlign="center">
                <Grid>
                  <Button
                    variant="contained"
                    disabled={!checkEnableRegister()}
                    onClick={onClickRegisterButton}
                  >
                    更新する
                  </Button>
                </Grid>
                <Grid sx={{ ml: 2 }}>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={onClickDeleteButton}
                  >
                    削除する
                  </Button>
                </Grid>
              </Grid>
            )}
            {registerError && (
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
