import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "design-system/utils";
import React from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 rounded-md",
      },
      color: {
        red: "bg-red-500 text-white hover:bg-red-600",
        green: "bg-green-500 text-white hover:bg-green-600",
        blue: "bg-blue-500 text-white hover:bg-blue-600",
        orange: "bg-orange-500 text-white hover:bg-orange-600",
        yellow: "bg-yellow-500 text-black hover:bg-yellow-600",
        lime: "bg-lime-500 text-black hover:bg-lime-600",
        teal: "bg-teal-500 text-white hover:bg-teal-600",
        dark: "bg-gray-800 text-white hover:bg-gray-900",
        white: "bg-white text-black hover:bg-gray-100",
        purple: "bg-purple-500 text-white hover:bg-purple-600",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: NonNullable<VariantProps<typeof buttonVariants>["color"]>;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className,
      variant,
      size,
      color,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={type}
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
