"use client";

import Link from "next/link";

import { linkStyle } from "@/style/commonStyle";

export default function Home() {
  return (
    <ul className="list-disc p-5">
      <li>
        お問い合わせ等は、管理人の
        <Link
          href={"https://www.instagram.com/someone71402410/"}
          rel="noopener noreferrer"
          target="_blank"
          className={linkStyle()}
        >
          Instagram
        </Link>
        もしくは
        <Link
          href={"https://x.com/someone7140"}
          rel="noopener noreferrer"
          target="_blank"
          className={linkStyle()}
        >
          X
        </Link>
        よりDMをお願いします。
      </li>
    </ul>
  );
}
