import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import { Accordion } from "@ui/accordion";
import { activeStepAtom } from "../../atoms/ui-atom";
import { AccordionStep } from "../../components/AccordionStep/AccordionStep";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ReviewPanel } from "../../components/ReviewPanel/ReviewPanel";
import { productsByStep, steps } from "../../data/products";
import type { StepId } from "../../data/types";
import { useCart } from "../../hooks/use-cart";

export function BundleBuilderPage() {
  const activeStep = activeStepAtom.useValue();
  const { getQty, setQty, stepSelectedCount } = useCart();

  function goToNextStep(currentIndex: number) {
    const next = steps[currentIndex + 1];
    if (next) activeStepAtom.update(next.id);
  }

  return (
    <>
      <Helmet title={trans("home")} appendAppName={false} />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 lg:grid-cols-[1fr_400px] lg:items-start lg:p-6">
        <Accordion
          type="single"
          collapsible
          value={activeStep}
          onValueChange={value => activeStepAtom.update(value as StepId | "")}
          className="flex flex-col gap-3">
          {steps.map((step, index) => (
            <AccordionStep
              key={step.id}
              step={step}
              selectedCount={stepSelectedCount(step.id)}
              onNext={
                activeStep === step.id && index < steps.length - 1
                  ? () => goToNextStep(index)
                  : undefined
              }>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {productsByStep(step.id).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    getQty={getQty}
                    setQty={setQty}
                  />
                ))}
              </div>
            </AccordionStep>
          ))}
        </Accordion>

        <ReviewPanel />
      </div>
    </>
  );
}
