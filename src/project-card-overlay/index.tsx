import { useEffect } from "react";

interface Props {
  slug: string;
}

const ProjectCardOverlay: React.FC<Props> = ({ slug }) => {
  useEffect(() => {
    console.info(`正在获取MOD信息：${slug}`);
  }, []);
  
  return (
    <>
    </>
  );
}

export default ProjectCardOverlay;
