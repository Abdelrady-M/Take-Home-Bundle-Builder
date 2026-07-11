import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { type ReactNode } from "react";
import { type ExternalToast, toast } from "sonner";

export { toast };

export function successToast(
  message: ReactNode,
  description?: ReactNode,
  options?: ExternalToast,
) {
  toast.success(message, {
    icon: <CheckCircleIcon className="text-green-600" />,
    description,
    dismissible: true,
    ...options,
  });
}

export function errorToast(
  message: ReactNode,
  description?: ReactNode,
  options?: ExternalToast,
) {
  toast.error(message, {
    icon: <XCircleIcon className="text-red-600" />,
    description,
    dismissible: true,
    ...options,
  });
}

export function infoToast(
  message: ReactNode,
  description?: ReactNode,
  options?: ExternalToast,
) {
  toast.info(message, {
    icon: <InfoCircledIcon className="text-blue-600 text-xl" />,
    description,
    dismissible: true,
    ...options,
  });
}

export function warningToast(
  message: ReactNode,
  description?: ReactNode,
  options?: ExternalToast,
) {
  toast.warning(message, {
    icon: <ExclamationTriangleIcon className="text-yellow-600 text-lg" />,
    description,
    dismissible: true,
    ...options,
  });
}

export function toastLoading(message: ReactNode, options?: ExternalToast) {
  const id = toast.loading(message, options);

  const dismiss = (callback?: () => void) => {
    toast.dismiss(id);
    callback?.();
  };

  return {
    success: (
      message: ReactNode,
      description?: ReactNode,
      options?: ExternalToast,
    ) => dismiss(() => successToast(message, description, options)),
    error: (
      message: ReactNode,
      description?: ReactNode,
      options?: ExternalToast,
    ) => dismiss(() => errorToast(message, description, options)),
    warning: (
      message: ReactNode,
      description?: ReactNode,
      options?: ExternalToast,
    ) => dismiss(() => warningToast(message, description, options)),
    info: (
      message: ReactNode,
      description?: ReactNode,
      options?: ExternalToast,
    ) => dismiss(() => infoToast(message, description, options)),
    dismiss,
  };
}
