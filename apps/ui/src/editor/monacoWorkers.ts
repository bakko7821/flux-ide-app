import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

// Берём тип из уже объявленной глобальной переменной MonacoEnvironment
type MonacoEnv = NonNullable<typeof MonacoEnvironment>;

const env: MonacoEnv = {
  getWorker(_workerId: string, label: string) {
    if (label === "json") return new JsonWorker();

    if (label === "css" || label === "scss" || label === "less") {
      return new CssWorker();
    }

    if (label === "html" || label === "handlebars" || label === "razor") {
      return new HtmlWorker();
    }

    if (label === "typescript" || label === "javascript") {
      return new TsWorker();
    }

    return new EditorWorker();
  },
};

// Назначаем глобально (Monaco читает именно отсюда)
globalThis.MonacoEnvironment = env;

export {};
