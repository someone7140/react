"use client";

import { useAtom } from "jotai";
import { Loader } from "@mantine/core";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskCheckListComponent } from "@/components/task/TaskCheckListComponent";
import { useGetTaskCheckDisplayListQuery } from "@/graphql/gen/graphql";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);
  const [{ data, fetching, error }] = useGetTaskCheckDisplayListQuery({
    requestPolicy: "network-only",
    pause: !userAccountState,
  });

  return (
    <div>
      {userAccountState && (
        <>
          {fetching && <Loader size={30} />}
          {data?.getTaskCheckDisplayList && (
            <TaskCheckListComponent
              taskCheckList={data.getTaskCheckDisplayList}
              error={error}
            />
          )}
        </>
      )}
    </div>
  );
}
