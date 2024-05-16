export default function (fileType) {
  if (fileType.startsWith("image")) return "img";
  else if (fileType.startsWith("video")) return 'video';
  else if (fileType.startsWith("audio")) return 'audio';
  else if (fileType.includes("plain")) return 'text';
  else if (fileType.includes("excel")) return 'excel';
  else if (fileType.includes("powerpoint")) return 'presentation';
  else if (fileType.includes("msword")) return 'doc';
  else if (fileType.includes("zip") || fileType.includes("rar")) return 'zip';
  else if (fileType.includes("pdf")) return 'pdf';
  else if (fileType.includes("javascript") ||
    fileType.includes("javascript") ||
    fileType.includes("java") ||
    fileType.includes("c") ||
    fileType.includes("rust") ||
    fileType.includes("php") ||
    fileType.includes("go")
  ) return 'script';
  else return "default";
}