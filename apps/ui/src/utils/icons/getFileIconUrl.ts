import {
  fileUrl,
  tsUrl,
  tsxUrl,
  jsUrl,
  jsonUrl,
  cssUrl,
  htmlUrl,
  mdUrl,
} from "../icons/fileIconsUrl";

const ICON_BY_EXT: Record<string, string> = {
  ts: tsUrl,
  tsx: tsxUrl,
  js: jsUrl,
  jsx: jsUrl,
  json: jsonUrl,
  css: cssUrl,
  html: htmlUrl,
  htm: htmlUrl,
  md: mdUrl,
};

export function getFileIconUrl(extOrName: string): string {
  const ext = extOrName.includes(".")
    ? (extOrName.split(".").pop()?.toLowerCase() ?? "")
    : extOrName.toLowerCase();

  return ICON_BY_EXT[ext] ?? fileUrl;
}
