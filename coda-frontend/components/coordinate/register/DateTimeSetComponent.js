import { Controller } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";

export default function DateTimeSetComponent(prop) {
  return (
    <>
      <Controller
        methods={prop.methods}
        name={prop.name}
        rules={{ required: prop.required ?? false }}
        control={prop.control}
        render={({ onChange, value }) => (
          <div>
            <DateTimePicker
              value={value}
              onChange={(val) => {
                onChange(val);
              }}
            />
          </div>
        )}
      />
      {prop.error && <div className="text-danger">選択必須です</div>}
    </>
  );
}
