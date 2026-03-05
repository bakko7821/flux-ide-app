export const words = [
  "программирование",
  "разработка",
  "интерфейс",
  "компонент",
  "алгоритм",
  "функция",
  "переменная",
  "данные",
  "проект",
  "архитектура",
  "оптимизация",
  "сервер",
  "клиент",
  "модуль",
  "структура",
  "приложение",
  "библиотека",
  "типизация",
  "логика",
  "состояние",
  "обработка",
  "система",
  "производительность",
  "масштабирование",
  "развертывание",
  "репозиторий",
  "версия",
  "интеграция",
  "платформа",
  "контекст",
  "асинхронность",
  "рендеринг",
  "поток",
  "итерация",
  "конфигурация",
  "событие",
  "контроллер",
  "модель",
  "маршрут",
  "компиляция",
  "и",
  "в",
  "на",
  "но",
  "с",
  "по",
  "для",
];

const sentenceEnd = [".", "?", "!"];
const inlinePunctuation = [",", ";", ":"];

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateText(wordCount = 60) {
  const result: string[] = [];

  let startSentence = true;

  for (let i = 0; i < wordCount; i++) {
    let word = words[Math.floor(Math.random() * words.length)];

    if (startSentence) {
      word = capitalize(word);
      startSentence = false;
    }

    result.push(word);

    const rand = Math.random();

    // шанс запятой
    if (rand < 0.15 && i < wordCount - 1) {
      const p =
        inlinePunctuation[Math.floor(Math.random() * inlinePunctuation.length)];

      result[result.length - 1] += p;
    }

    // шанс окончания предложения
    if (rand > 0.85 && i < wordCount - 1) {
      const end = sentenceEnd[Math.floor(Math.random() * sentenceEnd.length)];

      result[result.length - 1] += end;
      startSentence = true;
    }
  }

  if (!sentenceEnd.some((p) => result[result.length - 1].endsWith(p))) {
    result[result.length - 1] += ".";
  }

  const last = result[result.length - 1];

  if (last.endsWith(",")) {
    result[result.length - 1] = last.slice(0, -1);
  }

  return result.join(" ");
}
