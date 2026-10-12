import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-caption font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-action-primary text-primary-foreground [a]:hover:opacity-80",
        secondary:
          "bg-neutral-badge text-badge [a]:hover:opacity-80",
        destructive:
          "bg-error-badge text-badge focus-visible:ring-error/40 [a]:hover:opacity-80",
        warning:
          "bg-warning-badge text-badge focus-visible:ring-warning/40 [a]:hover:opacity-80",
        success:
          "bg-success-badge text-badge focus-visible:ring-success/40 [a]:hover:opacity-80",
        info:
          "bg-info-badge text-badge focus-visible:ring-info/40 [a]:hover:opacity-80",
        outline:
          "border-muted text-foreground [a]:hover:bg-raised [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-raised hover:text-muted-foreground dark:hover:bg-raised/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
