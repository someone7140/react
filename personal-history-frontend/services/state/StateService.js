import useSWR from "swr";

export const useSharedState = (key, initialData) => {
  const { data: sharedState, mutate: setSharedState } = useSWR(key, null, {
    initialData,
  });
  return { sharedState, setSharedState };
};
