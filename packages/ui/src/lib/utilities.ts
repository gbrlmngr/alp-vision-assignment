import { type TSchema as TMeaningDtoSchema } from "@alp-vision-assignment/shared/dist/validation-schemas/meaning-of-life";
import { ESubmissionState, environmentVariables } from "./constants";

export const submissionStateToBackgroundColorVariable = (
  submissionState: ESubmissionState
): string => {
  const mapping: Record<ESubmissionState, string> = {
    [ESubmissionState.Idle]: "var(--pre-submmission-background)",
    [ESubmissionState.Pending]: "var(--pre-submmission-background)",
    [ESubmissionState.Success]: "var(--successful-submission-background)",
    [ESubmissionState.Failure]: "var(--failed-submission-background)",
  };

  return (
    mapping[submissionState] ??
    "var(--pre-submmission-background, rgba(255, 255, 0, 1))"
  );
};

type TMeaningResponse =
  | { success: true; message: string }
  | { success: false; code: string | number; reason: string };

export const saveMeaning = async (
  meaningDto: TMeaningDtoSchema
): Promise<TMeaningResponse> => {
  const response = await fetch(`${environmentVariables.API_ROOT}v1/meaning`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(meaningDto),
  });

  if (!response.ok) {
    return {
      success: false,
      code: response.status,
      /* The reason is an i18n string */
      reason: "meaning-of-life.errors.unable-to-save",
    };
  }

  return {
    success: true,
    /* The message is an i18n string */
    message: "meaning-of-life.saved",
  };
};
