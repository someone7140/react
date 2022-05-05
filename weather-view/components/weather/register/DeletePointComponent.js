import { useState } from "react";
import { useSWRConfig } from "swr";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";

import { deleteGeographicPoint } from "../../../grpc/api/GeographicPointApi";

export default function DeletePointComponent(prop) {
  const { mutate } = useSWRConfig();
  const [deleteError, setDeleteError] = useState(false);

  function onCancel() {
    setDeleteError(false);
    prop.setDisplayDeleteModal(false);
  }

  async function onDelete() {
    const result = await mutate(
      "/GeographicPointService/DeleteGeographicPoint",
      deleteGeographicPoint(prop.pointId)
    );
    if (result?.success) {
      setDeleteError(false);
      prop.commitDelete();
    } else {
      setDeleteError(true);
    }
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
        open={prop.displayDeleteModal}
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
              <Grid sx={{ mt: 1 }}>地点削除</Grid>
              <Grid>
                <IconButton>
                  <CloseIcon onClick={onCancel} />
                </IconButton>
              </Grid>
            </Grid>
          </Typography>
          <Box sx={{ mt: 2 }}>
            削除して問題なければ「削除する」を押してください。
          </Box>
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button variant="contained" color="inherit" onClick={onDelete}>
              削除する
            </Button>
          </Box>
          {deleteError && (
            <Box sx={{ mt: 2, color: "error.main" }}>
              削除時にエラーが発生しました
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
