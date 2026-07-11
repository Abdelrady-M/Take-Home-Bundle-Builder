import { trans } from "@mongez/localization";
import Is from "@mongez/supportive-is";

export function parseError(error: any) {
  if (Is.empty(error)) {
    return error;
  }

  if (error.response) {
    error = error.response;
  }

  if ([405, 500, 401].includes(error.status)) {
    return trans("somethingWentWrong");
  }

  if (error.status === 404) {
    return trans("notFound");
  }

  if (error?.data?.errors) {
    error = error.data.errors;
  }

  if (error?.data?.error) {
    error = error.data.error;
  }

  let errorContent: any;

  if (Is.array(error)) {
    errorContent = error.map((error: any) => {
      if (error.value || error.error) {
        return <div key={error.key}>{error.value || error.error}</div>;
      }

      return error;
    });
  } else {
    errorContent = error;
  }

  return errorContent;
}
