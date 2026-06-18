const DEFAULT_DAYS = 90;
const RE_ENTRY_DAYS = 7;

export type DeportationData = {
  startTime: number;
  totalDays: number;
  isReEntry: boolean;
  isDone: boolean;
};

// Получаем имя текущего вошедшего юзера
export function getCurrentDeportationUserKey(): string {
  return localStorage.getItem("current_user") || "";
}

// Базовое чтение из localStorage
export function getDeportationData(userKey: string): DeportationData | null {
  if (!userKey) return null;
  const raw = localStorage.getItem(`deportation_${userKey}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DeportationData;
  } catch {
    return null;
  }
}

// ИСПРАВЛЕНО: Теперь возвращаем дату ВСЕГДА, чтобы не ломать интерфейс после завершения таймера
export function getDeportationStartDate(userKey: string): Date | null {
  const data = getDeportationData(userKey);
  if (!data || !data.startTime) return null; 
  return new Date(data.startTime);
}

// Сколько дней осталось
export function getDeportationDaysLeft(userKey: string): number {
  const data = getDeportationData(userKey);
  if (!data || data.isDone) return 0;

  const elapsedMs = Date.now() - data.startTime;
  const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
  const left = Math.ceil(data.totalDays - elapsedDays);
  return left < 0 ? 0 : left;
}

// Какой лимит у юзера (90 или 7)
export function getDeportationLimit(userKey: string): number {
  const data = getDeportationData(userKey);
  return data ? data.totalDays : DEFAULT_DAYS;
}

// Завершен ли таймер
export function isDeportationDone(userKey: string): boolean {
  const data = getDeportationData(userKey);
  return data ? data.isDone : false;
}

// Пометить таймер как завершенный
export function setDeportationDone(userKey: string, isDone: boolean): void {
  const data = getDeportationData(userKey);
  if (!data) return;
  data.isDone = isDone;
  localStorage.setItem(`deportation_${userKey}`, JSON.stringify(data));
}

// Установка флага повторного въезда
export function setReEntryFlag(userKey: string, isReEntry: boolean): void {
  if (!userKey) return;
  localStorage.setItem(`re_entry_flag_${userKey}`, isReEntry ? "true" : "false");
}

// Полный сброс таймера
export function resetDeportationTimer(userKey: string): void {
  if (!userKey) return;
  localStorage.removeItem(`deportation_${userKey}`);
}

// Инициализация при входе в аккаунт
export function ensureDeportationTimerForUser(userKey: string, isReEntry: boolean = false) {
  if (!userKey) return;
  
  const storageKey = `deportation_${userKey}`;
  const existingData = getDeportationData(userKey);
  const totalDays = isReEntry ? RE_ENTRY_DAYS : DEFAULT_DAYS;

  // Перезаписываем таймер, если он уже был завершен, чтобы запустить новый круг
  if (existingData && !existingData.isDone && existingData.totalDays === totalDays) {
    return; 
  }

  const data: DeportationData = {
    startTime: Date.now(),
    totalDays: totalDays,
    isReEntry: isReEntry,
    isDone: false
  };

  localStorage.setItem(storageKey, JSON.stringify(data));
}