import { Menu } from "primereact/menu";
import { ListBox } from "primereact/listbox";

export default function NovelContentsHeadLineListComponent(prop) {
  const options = prop.headlineList.map((headline) => {
    return {
      code: headline.key,
      name: headline.name,
    };
  });

  return (
    <ListBox
      onChange={(e) => {
        prop.selectHeadline(e.value.code);
      }}
      options={options}
      optionLabel="name"
      itemTemplate={(option) => {
        return <div style={{ wordWrap: "break-word" }}>{option.name}</div>;
      }}
      value={options.find((option) => option.code == prop.focusHeadlineKey)}
    />
  );
}
