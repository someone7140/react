import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

export default function ShopSelectComponent(prop) {
  const options = prop.shops?.map((s) => {
    return { value: s.shop_setting_id, label: s.name };
  });

  const customFilter = (option, searchText) => {
    return option?.label?.startsWith(searchText);
  };
  return (
    <>
      <Form.Label className={prop.required ? "required" : ""}>
        ショップ選択
      </Form.Label>
      <Controller
        methods={prop.methods}
        name="shopSettingId"
        rules={{ required: prop.required ?? false }}
        control={prop.control}
        render={({ onChange, value, name, ref }) => (
          <div
            className="mx-auto"
            style={{
              maxWidth: `500px`,
            }}
          >
            <Select
              inputRef={ref}
              options={options}
              value={options?.find((c) => c.value === value)}
              onChange={(val) => {
                onChange(val?.value);
              }}
              filterOption={customFilter}
              isClearable
            />
          </div>
        )}
      />
      {prop.errors?.shopSettingId && (
        <div className="text-danger">ショップの選択は必須です</div>
      )}
    </>
  );
}
