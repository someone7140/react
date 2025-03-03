import { FC } from "react";
import { Button, Tooltip } from "@mui/material";

export const TooltipSample: FC = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Tooltip
        title={
          <div style={{ whiteSpace: "pre-line" }}>{`sample1
sample2`}</div>
        }
      >
        <Button variant="contained" sx={{ textTransform: "none" }}>
          tooltip改行テスト
        </Button>
      </Tooltip>
    </div>
  );
};
