import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { Button } from "@ui/button";
import type { ReactNode } from "react";
import type { StepDefinition } from "../../data/types";

interface AccordionStepProps {
  step: StepDefinition;
  selectedCount: number;
  onNext?: () => void;
  children: ReactNode;
}

export function AccordionStep({
  step,
  selectedCount,
  onNext,
  children,
}: AccordionStepProps) {
  return (
    <AccordionItem
      value={step.id}
      className="rounded-[10px] border-b-0 bg-[#edf4ff] px-4 first:pt-2">
      <p className="px-1 pt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Step {stepNumber(step.id)} of 4
      </p>
      <AccordionTrigger className="border-t border-foreground/10 py-4 hover:no-underline">
        <span className="flex flex-1 items-center gap-2">
          <img src={step.icon} alt="" className="size-6.5" />
          <span className="text-lg font-semibold text-foreground">
            {step.title}
          </span>
        </span>
        {selectedCount > 0 && (
          <span className="mr-2 text-sm font-medium text-primary">
            {selectedCount} selected
          </span>
        )}
      </AccordionTrigger>
      <AccordionContent className="pb-5">
        <div className="flex flex-col gap-3">
          {children}
          {onNext && (
            <Button
              variant="outline"
              className="mt-2 self-start rounded-lg border-primary px-6 text-primary hover:bg-primary/5 hover:text-primary"
              onClick={onNext}>
              {step.nextLabel}
            </Button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function stepNumber(id: StepDefinition["id"]): number {
  const order: StepDefinition["id"][] = [
    "cameras",
    "plan",
    "sensors",
    "extra-protection",
  ];
  return order.indexOf(id) + 1;
}
