import type { InfoCard } from "../types";

type ArticleContent = Pick<InfoCard, "content" | "content_en" | "content_zh">;

export function getLocalizedArticleContent(
  article: ArticleContent | undefined,
  language: string
): string {
  if (!article) return "";

  switch (language) {
    case "en":
      return article.content_en ||  "";
    case "zh":
      return article.content_zh || "";
    default:
      return article.content || "";
  }
}
