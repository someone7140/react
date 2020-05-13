import React, { useContext } from "react";
import { MapStore } from "../../store/MapStore";
import { updateChoiceType } from "../../service/StoreService";

export default function ChoiceTypeComponent() {
  const { state, dispatch } = useContext(MapStore);
  const choiceType = state.choiceType;
  function isChecked(type) {
    return choiceType.includes(type);
  }
  function handleCheckBoxChange(e) {
    const target = e.target;
    if (target.name === "deliverly") {
      dispatchUpdateChoice(target.checked, "deliverly");
    } else {
      dispatchUpdateChoice(target.checked, "takeout");
    }
  }
  function dispatchUpdateChoice(checked, type) {
    if (checked && !choiceType.includes(type)) {
      updateChoiceType(state, dispatch, [...choiceType, type]);
    } else if (!checked && choiceType.includes(type)) {
      updateChoiceType(
        state,
        dispatch,
        choiceType.filter((c) => c !== type)
      );
    }
  }

  return (
    <div>
      【提供方式】 &nbsp;&nbsp; デリバリー
      <input
        type="checkbox"
        name="deliverly"
        checked={isChecked("deliverly")}
        onChange={handleCheckBoxChange}
      />
      &nbsp;&nbsp; テイクアウト
      <input
        type="checkbox"
        name="takeout"
        checked={isChecked("takeout")}
        onChange={handleCheckBoxChange}
      />
    </div>
  );
}
