import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { type AtomPortal } from "@mongez/react-atom";
import { XIcon } from "lucide-react";
import React from "react";

export type DrawerProps = {
  /**
   * Signal portal to determine the modal state (opened or closed)
   */
  portal: AtomPortal<any>;
  /**
   * If set to true, a close button will be shown in the modal header
   * @default true
   */
  withCloseButton?: boolean;
  /**
   * If set to true, the modal will be closed when the backdrop is clicked
   * @default true
   */
  closeBackdrop?: boolean;
  /**
   * If set to true, the modal will be closed when the escape key is pressed
   * @default true
   */
  closeEsc?: boolean;
  /**
   * If set to false, it means the modal can not be closed by clicking outside the modal, close button will be hidden and esc button will be disabled
   * @default true
   */
  dismissable?: boolean;
  /**
   * Modal title
   */
  title?: React.ReactNode;
  /**
   * Modal description
   */
  description?: React.ReactNode;
  /**
   * Close icon
   */
  closeIcon?: React.ReactNode;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Modal size
   */
  size?: "sm" | "md" | "lg" | "xl" | "fullscreen";
  /**
   * Drawer direction
   */
  direction?: "left" | "right" | "top" | "bottom";
};

function _Drawer({
  portal,
  withCloseButton = true,
  closeBackdrop = true,
  closeEsc = true,
  dismissable = true,
  title,
  closeIcon = <XIcon />,
  children,
  description,
  direction = "right",
}: DrawerProps) {
  const opened = portal.useOpened();
  const closeUsingEsc = closeEsc && dismissable;
  const hasCloseButton = withCloseButton && dismissable;
  const closeUsingBackdrop = closeBackdrop && dismissable;

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Sheet
          modal
          open={opened}
          onOpenChange={opened => portal.change("opened", opened)}>
          <SheetContent
            onInteractOutside={e => {
              if (!closeUsingBackdrop) {
                e.preventDefault();
                return;
              }
            }}
            onEscapeKeyDown={e => {
              if (!closeUsingEsc) {
                e.preventDefault();
                return;
              }
            }}
            side={direction}>
            <SheetHeader>
              {hasCloseButton && (
                <button
                  onClick={() => portal.close()}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                  {closeIcon}
                  <span className="sr-only">Close</span>
                </button>
              )}
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">{children}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

const Drawer = React.memo(_Drawer);
export default Drawer;
