import { useState } from "react";
import { useSWRConfig } from "swr";

export const useMutateApi = () => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  async function execPostApi(props) {
    try {
      setIsLoading(true);
      const res = await mutate(props.apiPath, props.execPost());
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      throw e;
    }
  }

  return { execPostApi, isLoading };
};
