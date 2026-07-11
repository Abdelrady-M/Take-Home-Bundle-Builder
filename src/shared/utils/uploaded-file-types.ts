/**
 * This file contains a list of all allowed uploaded file types.
 */

export const accept = {
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  ico: "image/vnd.microsoft.icon",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  zip: "application/zip",
  exe: "application/x-msdownload",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  avi: "video/x-msvideo",
  mov: "video/quicktime",
  wmv: "video/x-ms-wmv",
  flv: "video/x-flv",
  wav: "audio/wav",
};

export const acceptedImages = [
  accept.png,
  accept.jpg,
  accept.gif,
  accept.webp,
  accept.bmp,
  accept.svg,
  accept.ico,
];

export const acceptedDocuments = [
  accept.pdf,
  accept.doc,
  accept.docx,
  accept.xls,
  accept.xlsx,
  accept.ppt,
  accept.pptx,
  accept.txt,
];

export const acceptedPDF = [accept.pdf];
export const acceptedExcel = [accept.xls, accept.xlsx];
export const acceptedWord = [accept.doc, accept.docx];
export const acceptedPowerPoint = [accept.ppt, accept.pptx];
export const acceptedText = [accept.txt];
export const acceptedZip = [accept.zip];
export const acceptedExecutable = [accept.exe];
export const acceptedAudio = [accept.mp3, accept.wav];
export const acceptedVideo = [
  accept.mp4,
  accept.avi,
  accept.mov,
  accept.wmv,
  accept.flv,
];

export const fileTypesDisplayTextMap = {
  [accept.png]: "PNG",
  [accept.jpg]: "JPG",
  [accept.gif]: "GIF",
  [accept.webp]: "WEBP",
  [accept.bmp]: "BMP",
  [accept.svg]: "SVG",
  [accept.ico]: "ICO",
  [accept.pdf]: "PDF",
  [accept.doc]: "Document",
  [accept.docx]: "Document",
  [accept.xls]: "Excel",
  [accept.xlsx]: "Excel",
  [accept.ppt]: "PowerPoint",
  [accept.pptx]: "PowerPoint",
  [accept.txt]: "Text",
  [accept.zip]: "ZIP",
  [accept.exe]: "Executable",
  [accept.mp3]: "MP3",
  [accept.mp4]: "MP4",
  [accept.avi]: "AVI",
  [accept.mov]: "MOV",
  [accept.wmv]: "WMV",
  [accept.flv]: "FLV",
  [accept.wav]: "WAV",
};
