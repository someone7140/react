import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // App外ページへの遷移 or ブラウザリロード
    const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      // このnavigationTypeはあくまでこのページに来たときの情報
      const navigationType =
        window?.performance?.getEntriesByType("navigation")[0];
      console.log(navigationType);
      event.preventDefault();
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);

  return (
    <div>
      <div>test</div>
      <input type="text" id="name" name="name" />
    </div>
  );
}
