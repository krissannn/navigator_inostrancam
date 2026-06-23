
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ChecklistItem, InfoCard, SupportedLanguage } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export function useStepArticle(stepId: number) {
  const [info, setInfo] = useState<InfoCard | null>(null);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    fetch(`${API_URL}/steps/${stepId}/articles`)
      .then((res) => res.json())
      .then((data: InfoCard[]) => {
        setInfo(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Failed to load step ${stepId}:`, err);
        setLoading(false);
      });
  }, [stepId]);

  const localizedContent =
    i18n.language === "en" ? info?.content_en :
    i18n.language === "zh" ? info?.content_zh :
    info?.content ?? null;

  const currentLang = (i18n.language as SupportedLanguage) || "ru";

  const localizedChecklist: ChecklistItem[] =
    info?.checklist?.map((point): ChecklistItem => {
      const rawDescription = point.description;
      const description =
        typeof rawDescription === "string"
          ? rawDescription
          : rawDescription && typeof rawDescription === "object"
            ? (rawDescription[currentLang] ?? rawDescription.ru ?? "")
            : "";

      return {
        ...point,
        description,
      };
    }) ?? [];

  return { info, loading, localizedContent, localizedChecklist };
}