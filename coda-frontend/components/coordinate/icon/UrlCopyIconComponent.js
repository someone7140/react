import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import { getCoordinateUrl } from "../../../services/common/PostService.js";

export default function UrlCopyIconComponent(prop) {
  return (
    <div role="button">
      <CopyToClipboard
        text={getCoordinateUrl(prop.coordinateId)}
        onCopy={() => toast("クリップボードへURLをコピーしました")}
      >
        <div>
          <img
            style={{
              width: "25px",
              height: "25px",
              marginLeft: prop.iconMarginLeft,
              marginTop: "4px",
            }}
            alt="copy"
            src="/copy_icon.png"
          />
          <div
            style={{
              fontSize: "10px",
              width: "50px",
              transform: "scale(0.8)",
              color: "black",
            }}
          >
            <span className={prop.urlLabelClassName}>URL</span>
            <div className={prop.copyLabelClassName}>コピー</div>
          </div>
        </div>
      </CopyToClipboard>
    </div>
  );
}
