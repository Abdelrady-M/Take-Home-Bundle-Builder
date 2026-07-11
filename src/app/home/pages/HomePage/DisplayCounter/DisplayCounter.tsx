import { counterAtom } from "@/app/home/atoms/counter-atom";
import { debounce } from "@mongez/reinforcements";
import { useEffect } from "react";

export function DisplayCounter() {
  const count = counterAtom.useValue(); // get current value and re-render when it changes

  useEffect(() => {
    const countTotal = document.getElementById("count-total");

    if (!countTotal) return;

    if (!count) return;

    const callback = debounce(() => {
      countTotal.classList.add("glow");

      setTimeout(() => {
        countTotal.classList.remove("glow");
      }, 2000);
    }, 0);

    callback();
  }, [count]);

  return (
    <button
      className="mx-auto transition-all duration-500 my-5"
      id="count-total">
      {count}
    </button>
  );
}
