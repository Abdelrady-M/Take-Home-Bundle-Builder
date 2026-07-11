import { useEffect, useState } from "react";
import { saveSystemForLater } from "../../service/persistence";

export function SaveForLater() {
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!justSaved) return;
    const timer = setTimeout(() => setJustSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [justSaved]);

  function handleSave() {
    saveSystemForLater();
    setJustSaved(true);
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      className="text-center text-sm italic text-muted-foreground underline">
      {justSaved ? "Saved! Come back anytime." : "Save my system for later"}
    </button>
  );
}
