import { Menu } from "primereact/menu";
import { ListBox } from "primereact/listbox";

export default function NovelContentsHeadLineListComponent(prop) {
  return (
    <ListBox
      onChange={(e) => {}}
      options={prop.headlineList.map((headline) => {
        return {
          code: headline.key,
          name: headline.name,
        };
      })}
      optionLabel="name"
      itemTemplate={(option) => {
        return <div style={{ wordWrap: "break-word" }}>{option.name}</div>;
      }}
    />
  );
}
