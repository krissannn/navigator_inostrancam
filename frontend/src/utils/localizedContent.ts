import type { InfoCard } from "../types";

type ArticleContent = Pick<InfoCard, "content" | "content_en" | "content_zh">;

export function getLocalizedArticleContent(
  article: ArticleContent | undefined,
  language: string
): string {
  if (!article) return "";

  switch (language) {
    case "en":
      return article.content_en || article.content || "";
    case "zh":
      return article.content_zh || article.content_en || article.content || "";
    default:
      return article.content || "";
  }
}
