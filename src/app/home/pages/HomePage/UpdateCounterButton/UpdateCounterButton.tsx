import { counterAtom } from "@/app/home/atoms/counter-atom";
import { Button } from "@/components/ui/button";

export function UpdateCounterButton() {
  const updateCount = () => {
    counterAtom.update(count => count + 1);
  };

  return (
    <Button variant="secondary" onClick={updateCount}>
      Update Counter
    </Button>
  );
}
