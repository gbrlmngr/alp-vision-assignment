import { get } from "env-var";

export enum ESubmissionState {
  Idle = "idle",
  Pending = "pending",
  Success = "success",
  Failure = "failure",
}

export const environmentVariables = {
  API_ROOT: get("REACT_APP_API_ROOT")
    .default("http://0.0.0.0:8081")
    .asUrlString(),
};
