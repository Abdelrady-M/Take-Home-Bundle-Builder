import { type AtomPortal } from "@mongez/react-atom";
import { XIcon } from "lucide-react";
import React from "react";

export type ModalProps = {
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
   * Whether to center the modal content
   * @default true
   */
  center?: boolean;
};

function _Modal({
  portal,
  withCloseButton = true,
  closeBackdrop = true,
  closeEsc = true,
  dismissable = true,
  title,
  closeIcon = <XIcon />,
  children,
  size = "md",
  center = true,
}: ModalProps) {
  const opened = portal.useOpened();
  const closeUsingEsc = closeEsc && dismissable;
  const hasCloseButton = withCloseButton && dismissable;
  const closeUsingBackdrop = closeBackdrop && dismissable;

  // Handle close on escape key press
  React.useEffect(() => {
    if (closeUsingEsc) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          portal.close();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [closeUsingEsc, portal]);

  // Handle close on backdrop click
  const handleBackdropClick = () => {
    if (closeUsingBackdrop) {
      portal.close();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex ${
          center ? "items-center" : "items-start"
        } justify-center transition-opacity duration-200 ${
          opened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={handleBackdropClick}
          aria-hidden="true"></div>
        {/* Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-lg transition-transform duration-200 ${
            opened ? "scale-100" : "scale-95"
          } ${
            size === "sm"
              ? "w-1/4"
              : size === "md"
                ? "w-1/2"
                : size === "lg"
                  ? "w-3/4"
                  : size === "xl"
                    ? "w-full"
                    : "w-full h-full" // fullscreen
          } ${!center ? "mt-8" : ""}`}
          onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <div className="p-4 flex items-center justify-between">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {hasCloseButton && (
              <button onClick={() => portal.close()}>{closeIcon}</button>
            )}
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
}

const Modal = React.memo(_Modal);
export default Modal;
