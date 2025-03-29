import clsx from "clsx";
import Image from "next/image";
import Label from "../product/label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <>
        <div
          className={clsx(
            "group flex h-full w-full items-center justify-center overflow-hidden border bg-[rgb(235,235,235)] hover:border-red-900 dark:bg-black",
            {
              relative: label,
              "border-2 border-red-600": active,
              "border-neutral-200 dark:border-neutral-800": !active,
            }
          )}
        >
          {props.src ? (
            <Image
              className={clsx("relative h-full w-full object-contain", {
                "hover:scale-105 transition-all duration-600":
                  isInteractive,
              })}
              {...props}
              alt="product image"
            />
          ) : null}

        </div>
        <div className="overflow-hidden w-full">
        {label ? (
          <Label
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position={label.position}
          />
        ) : null}
      </div>
    </>
  );
}