import Image from "next/image";

export default function LoadingComponent() {
  return (
    <div>
      <Image src={`/loading.gif`} alt="Loading..." width={100} height={100} />
    </div>
  );
}
