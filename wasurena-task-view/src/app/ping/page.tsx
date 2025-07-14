import { Suspense } from "react";

async function DataComponent() {
  await fetch(process.env.NEXT_PUBLIC_API_URL ?? "", {
    cache: "no-store", // SSRの場合
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: '{"operationName":"PingCheckExecute","query":"query PingCheckExecute {  pingCheckExecute }"}',
  });

  return <div>ping</div>;
}

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  );
}
