import { PATH } from "@/constant/config";

const validRoutes = new Set(Object.values(PATH));

export const savePreviousPage = (path: string) => {
  localStorage.setItem("previousPath", path);
};

export const getPreviousPage = (): string | null => {
  const previousPath = localStorage.getItem("previousPath");
  return previousPath && validRoutes.has(previousPath) ? previousPath : null;
};
