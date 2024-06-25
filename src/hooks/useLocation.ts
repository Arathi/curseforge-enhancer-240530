import { unsafeWindow } from "$";
import { useEffect, useState } from "react";

export const useLocation = () => {
  const [url, setUrl] = useState<string>(unsafeWindow.location.href);

  useEffect(() => {
    window.onhashchange = ({ oldURL, newURL }) => {
      console.info(`url发生变化：${oldURL} -> ${newURL}`);
      setUrl(newURL);
    };
  });

  return [url, setUrl];
};
