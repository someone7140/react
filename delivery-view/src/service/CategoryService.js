import axios from "axios";
import { setCategoryLDispatch } from "../util/DispatchUtil";

export function setCategoryLList(dispatch) {
  try {
    axios
      .get(`${process.env.REACT_APP_STORE_API_DOMAIN}/getCategoryL`)
      .then((results) => {
        if (results.status === 200) {
          setCategoryLDispatch(dispatch, results.data);
        } else {
          setCategoryLDispatch(dispatch, []);
        }
      });
  } catch (e) {
    setCategoryLDispatch(dispatch, []);
  }
}
