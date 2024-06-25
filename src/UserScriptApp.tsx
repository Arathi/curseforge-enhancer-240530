import { unsafeWindow } from "$";
import { useInterval } from "ahooks";
import pino from "pino";
import { ReactPortal, useEffect, useMemo, useState } from "react";
import Aside from "./components/aside";
import SearchParams, { parseSortType } from "./domains/search-params";

const logger = pino({
  name: "ROOT",
  transport: {
    target: "pino-pretty",
  },
});

const UserScriptApp = () => {
  const resultPortals: ReactPortal[] = [];
  const [href, useHref] = useState(unsafeWindow.location.href);
  const [loading, setLoading] = useState(false);

  const searchParams = useMemo<SearchParams>(() => {
    logger.debug(`URL发生变化：${href}`);

    const url = new URL(href);
    const params: SearchParams = {
      gameId: 432,
      // classId: 6,
    };
    for (const entry of url.searchParams.entries()) {
      const [key, value] = entry;
      switch (key) {
        case "page":
          params.index = parseInt(value) - 1;
          break;
        case "pageSize":
          params.pageSize = parseInt(value);
          break;
        case "sortBy":
          params.sortField = parseSortType(value);
          break;
        // case "categories":
        //   const categoryIds = value.split(",").map(slug => {
        //     const cat = categories.find(cat => cat.slug === slug);
        //     return cat.id;
        //   });
        //   params.categoryIds = categoryIds;
        //   break;
        case "version":
          params.gameVersion = value;
          break;
        case "gameVersionTypeId":
          const loaders = value.split(",").map((loader) => parseInt(loader));
          params.gameFlavors = loaders;
          break;
      }
    }

    logger.info(`查询参数如下：`);
    logger.info(params);
    return params;
  }, [href]);

  useEffect(() => {
    logger.info(`UserScriptApp加载完成`);
  }, []);

  useInterval(() => {
    useHref(unsafeWindow.location.href);
  }, 250);

  useInterval(() => {
    logger.debug(`正在检查results-container更新`);
    const resultsContainer = document.querySelector("div.results-container");
    if (resultsContainer === null) {
      logger.warn(`未找到results-container`);
      return;
    }

    if (resultsContainer.id === "cfe-results") {
      logger.debug(`results-container已经更新`);
      return;
    }

    if (loading) {
      logger.warn(`正在加载数据，无法再次更新`);
      return;
    }

    const cards: NodeListOf<HTMLDivElement> =
      resultsContainer.querySelectorAll("div.project-card");
    setLoading(true);
    updateResults(cards).then((amount) => {
      logger.info(`${amount}个project-card更新完成`);
      resultsContainer.id = "cfe-results";
      setLoading(false);
    });
  }, 500);

  async function updateResults(
    cards: NodeListOf<HTMLDivElement>
  ): Promise<number> {
    let counter = 0;
    cards.forEach((card, index) => {
      logger.info(`正在更新第${index + 1}个project-card`);
      updateProjectCard(card);
      counter++;
    });
    return counter;
  }

  function updateProjectCard(card: HTMLDivElement): boolean {
    const overlayLink = card.querySelector<HTMLAnchorElement>("a.overlay-link");
    if (overlayLink === null) {
      return false;
    }

    const slashIndex = overlayLink.href.lastIndexOf("/");
    if (slashIndex < 0) {
      return false;
    }

    const slug = overlayLink.href.substring(slashIndex + 1);
    card.id = `cfe-mod-${slug}`;
    logger.info(`${card.id} 更新完成`);

    return true;
  }

  return (
    <>
      <Aside />
      {resultPortals}
    </>
  );
};

export default UserScriptApp;
