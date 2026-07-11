export function copyToClipboard(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // Use the modern Clipboard API if available
    navigator.clipboard.writeText(text).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  } else {
    // Fallback method for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      if (!successful) {
        console.error("Fallback: Copying text command was unsuccessful");
      }
    } catch (err) {
      console.error("Fallback: Unable to copy", err);
    }

    document.body.removeChild(textarea);
  }
}
