import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TSchema as TMeaningDtoSchema } from "@alp-vision-assignment/shared/dist/validation-schemas/meaning-of-life";
import "./i18n";
import "./App.css";
import { MeaningOfLifeForm } from "./components/meaning-of-life-form";
import { ESubmissionState } from "./lib/constants";
import {
  saveMeaning,
  submissionStateToBackgroundColorVariable,
} from "./lib/utilities";

function App() {
  const [submissionState, setSubmissionState] = useState<ESubmissionState>(
    ESubmissionState.Idle
  );
  const [apiSubmissionResponse, setApiSubmissionResponse] = useState<{
    code?: string | number;
    text?: string;
  }>({});
  const { t } = useTranslation();

  const handleSubmit = async (meaningDto: TMeaningDtoSchema) => {
    setApiSubmissionResponse({});
    setSubmissionState(ESubmissionState.Pending);

    /**
     * Saving the data might be too fast to observe the loading state,
     * so uncommenting the setTimeout block will allow for achieving that
     *
    const delay = (ms: number) => new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

    await delay(20_000);
    */

    const response = await saveMeaning(meaningDto);

    if (response.success) {
      setSubmissionState(ESubmissionState.Success);
      setApiSubmissionResponse({
        text: response.message,
      });
    } else {
      setSubmissionState(ESubmissionState.Failure);
      setApiSubmissionResponse({
        code: response.code,
        text: response.reason,
      });
    }
  };

  return (
    <div
      className="meaning-of-life vh-100 vw-100"
      data-testid="meaning-of-life"
      style={{
        backgroundColor:
          submissionStateToBackgroundColorVariable(submissionState),
      }}
    >
      <Stack gap={2} className="container h-100 text-center">
        <section className="flex-grow-1 d-flex align-items-center justify-content-center">
          <h1>
            <span>{t("meaning-of-life.primary-label.0")}</span>{" "}
            <span className="fst-italic">
              {t("meaning-of-life.primary-label.1")}
            </span>{" "}
            <span>{t("meaning-of-life.primary-label.2")}</span>
          </h1>
        </section>

        <section className="flex-grow-1">
          {apiSubmissionResponse.text && (
            <p
              className={
                submissionState === ESubmissionState.Failure
                  ? "text-white"
                  : "text-black"
              }
              data-testid="meaning-of-life/api-indicator"
            >
              {t(apiSubmissionResponse.text, {
                code: apiSubmissionResponse.code,
              })}
            </p>
          )}

          <MeaningOfLifeForm
            isLoading={submissionState === ESubmissionState.Pending}
            onSubmit={handleSubmit}
            onInvalid={() => {
              setSubmissionState(ESubmissionState.Failure);
            }}
          />
        </section>
      </Stack>
    </div>
  );
}

export default App;
