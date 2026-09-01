"use client";

import { useServerInsertedHTML } from "next/navigation";

const themeInit = `(function(){try{var s=localStorage.getItem("theme");var t=s||"dark";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}document.documentElement.classList.add("js");})();`;

export default function ThemeInit() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: themeInit }} />
  ));
  return null;
}
