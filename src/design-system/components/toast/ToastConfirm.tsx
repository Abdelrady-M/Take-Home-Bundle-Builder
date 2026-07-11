import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { portalAtom } from "@mongez/react-atom";
import { type ReactNode } from "react";

type ToastConfirmOptions = {
  heading: ReactNode;
  content: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButton?: ReactNode;
  cancelButton?: ReactNode;
};

export async function toastConfirm(
  options: ToastConfirmOptions,
): Promise<boolean>;
export async function toastConfirm(
  heading: ReactNode,
  content: ReactNode,
): Promise<boolean>;
export async function toastConfirm(
  optionsOrHeading: ToastConfirmOptions | ReactNode,
  content?: ReactNode,
): Promise<boolean> {
  return new Promise(resolve => {
    if (
      typeof optionsOrHeading === "object" &&
      optionsOrHeading !== null &&
      "heading" in optionsOrHeading
    ) {
      const options = optionsOrHeading as ToastConfirmOptions;
      toastConfirmPortal.open({
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    } else {
      toastConfirmPortal.open({
        heading: optionsOrHeading,
        content,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    }
  });
}

const toastConfirmPortal = portalAtom("toastConfirm");

export function ToastConfirm() {
  const {
    heading,
    content,
    onConfirm,
    onCancel,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    confirmButton,
    cancelButton,
  } = toastConfirmPortal.useData();
  const opened = toastConfirmPortal.useOpened();

  return (
    <>
      <AlertDialog
        open={opened}
        onOpenChange={opened => toastConfirmPortal.change("opened", opened)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{heading}</AlertDialogTitle>
            <AlertDialogDescription>{content}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {cancelButton ?? (
              <AlertDialogCancel onClick={onCancel}>
                {cancelLabel}
              </AlertDialogCancel>
            )}
            {confirmButton ?? (
              <AlertDialogAction onClick={onConfirm}>
                {confirmLabel}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
