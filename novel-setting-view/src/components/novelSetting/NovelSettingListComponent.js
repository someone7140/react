import NovelRegisterComponent from "components/novel/NovelRegisterComponent";

export default function NovelListComponent(prop) {
  return (
    <>
      {prop.data.map((setting) => (
        <div
          key={setting.id}
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <div>{setting.name}</div>
        </div>
      ))}
    </>
  );
}
