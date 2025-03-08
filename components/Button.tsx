"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
	cva,
	type VariantProps,
} from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-90 backdrop-blur-md",
	{
		variants: {
			variant: {
				filled:
					"bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary",
				outline:
					"border-2 border-primary/20 bg-transparent hover:bg-accent hover:text-primary",
			},
			size: {
				default: "h-10 px-6 py-3",
				sm: "h-8 px-4 text-xs",
				lg: "h-12 px-8 text-lg",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "filled",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	label: React.ReactNode;
}

const Button = React.forwardRef<
	HTMLButtonElement,
	ButtonProps
>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			label,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className })
				)}
				ref={ref}
				aria-label={
					typeof label === "string" ? label : "Button"
				}
				{...props}
			>
				{label}
			</Comp>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
