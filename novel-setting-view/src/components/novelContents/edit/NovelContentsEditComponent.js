import { Card } from "primereact/card";

export default function NovelContentsEditComponent(prop) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <Card
        title="見出し"
        style={{
          width: 300,
          textAlign: "start",
          border: "solid blue 1px",
          height: 500,
          overflowY: "scroll",
        }}
      >
        <div style={{ wordWrap: "break-word" }}>aaaa</div>
      </Card>
      <Card
        title="文章"
        style={{
          width: 1000,
          textAlign: "start",
          border: "solid orange 1px",
          height: 500,
        }}
      >
        aaaa
      </Card>
    </div>
  );
}
