import { ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { unsafeWindow } from "$";
import ProjectCardOverlay from "./project-card-overlay";

const App = () => {
  const [portals, setPortals] = useState<ReactPortal[]>([]);

  useEffect(() => {
    const timer = setInterval(updateProjectCards, 1000);
    console.info(`已创建ProjectCard更新定时器：${timer}`);
  }, []);

  function updateProjectCards () {
    const projectCards: NodeListOf<HTMLDivElement> = unsafeWindow.document.querySelectorAll('div.project-card');
    const portals: ReactPortal[] = [];
    for (let index = 0; index < projectCards.length; index++) {
      const projectCard = projectCards.item(index);
      const portal = updateProjectCard(projectCard, index);
      if (portal !== null) {
        portals.push(portal);
      }
    }
    setPortals(portals);
  }

  function updateProjectCard(projectCard: HTMLDivElement, index: number): ReactPortal | null {
    const pcId = projectCard.id;
    if (pcId.startsWith(`project-card-`)) {
      // console.debug(`div.project-card#${pcId} 已更新`);
      return null;
    }
    
    do {
      const overlayLink: HTMLAnchorElement | null = projectCard.querySelector('a.overlay-link');
      if (overlayLink === null) {
        console.warn(`查询结果[${index}]：未找到overlay-link，无法确定slug`);
        break;
      }
      
      const href = overlayLink.href;
      const slugIndex = href.lastIndexOf('/minecraft/mc-mods/');
      if (slugIndex < 0) {
        console.warn(`查询结果[${index}]：无效的地址，无法确定slug：${href}`);
        break;
      }

      const slug = href.substring(slugIndex + 19);
      const key = `cfe-pco-${slug}`;

      console.info(`正在创建container#${key}`);
      const container = document.createElement('div');
      container.className = `project-card-overlay`;
      projectCard.append(container);

      console.info(`正在创建portal#${key}`);
      projectCard.id = `project-card-${slug}`;
      return createPortal(<ProjectCardOverlay key={key} slug={slug} />, container, key);
    } while (false);

    return null;
  }

  return (
    <>
      { portals }
    </>
  );
};

export default App;
