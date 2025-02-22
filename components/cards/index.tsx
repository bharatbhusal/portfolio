"use client";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { ReactNode } from "react";

type CustomCardProps = {
	className?: string;
	header?: ReactNode;
	content: ReactNode;
	footer?: ReactNode;
};

const CustomCard = ({
	className,
	header,
	content,
	footer,
}: CustomCardProps) => {
	return (
		<Card
			className={cn(
				"w-full h-full flex flex-col justify-between",
				className
			)}
		>
			{header && (
				<CardHeader className="p-4 pb-0">{header}</CardHeader>
			)}
			<CardContent className="p-4 flex-1">
				{content}
			</CardContent>
			{footer && (
				<CardFooter className="p-4 pt-0">{footer}</CardFooter>
			)}
		</Card>
	);
};
export default CustomCard;
