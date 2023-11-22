import { FC, KeyboardEventHandler, useRef } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  type TSchema as TMeaningDtoSchema,
} from "@alp-vision-assignment/shared/dist/validation-schemas/meaning-of-life";

interface IMeaningOfLifeFormProps {
  onSubmit: SubmitHandler<TMeaningDtoSchema>;
  onInvalid?: SubmitErrorHandler<TMeaningDtoSchema>;
  isLoading?: boolean;
}

export const MeaningOfLifeForm: FC<IMeaningOfLifeFormProps> = ({
  onSubmit,
  onInvalid,
  isLoading,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  const handleSubmit: SubmitHandler<TMeaningDtoSchema> = ({ text }) => {
    if (typeof onSubmit === "function") onSubmit({ text });
  };

  const {
    register,
    handleSubmit: handleHookFormSubmit,
    watch,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<TMeaningDtoSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const textValue = watch("text")?.trim?.();

  const handleInputKeyDown: KeyboardEventHandler = (event) => {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      if (formRef.current && textValue?.length) formRef.current.requestSubmit();
    }
  };

  const isPending = isLoading || isSubmitting;

  return (
    <Form
      noValidate
      ref={formRef}
      onSubmit={handleHookFormSubmit(handleSubmit, onInvalid)}
    >
      <Form.Group>
        {!isSubmitted && (
          <small
            className="d-block mx-1 text-end"
            data-testid="meaning-of-life/input/length-indicator"
          >
            <span
              className={textValue?.length > 100 ? "text-danger" : "text-black"}
            >
              {textValue?.length ?? 0}
            </span>
            <span className="text-muted">/100</span>
          </small>
        )}
        <FormControl
          as="textarea"
          rows={1}
          cols={1}
          {...register("text")}
          onKeyDown={handleInputKeyDown}
          id="meaning-of-life-input"
          data-testid="meaning-of-life/input"
          readOnly={isPending}
        ></FormControl>

        {isSubmitted && !isValid && (
          <Form.Text
            className="d-block py-2 text-white"
            data-testid="meaning-of-life/input/validation-error"
          >
            {t(errors.text?.message as string)}
          </Form.Text>
        )}

        {!isSubmitted && (
          <Form.Text
            className="d-block py-2 text-black fst-italic"
            data-testid="meaning-of-life/input/hint"
          >
            <span>{t("forms.hints.shift-key-to-submit.0")}</span>{" "}
            <kbd>{t("forms.hints.shift-key-to-submit.1")}</kbd>{" "}
            <span>{t("forms.hints.shift-key-to-submit.2")}</span>
          </Form.Text>
        )}
      </Form.Group>

      <Button
        type="submit"
        disabled={isPending || !textValue?.length}
        className="mt-4 border-0 call-to-action-button"
        data-testid="meaning-of-life/call-to-action"
        style={{
          backgroundColor: "var(--call-to-action-background)",
          color: "var(--call-to-action-color)",
          cursor: isPending
            ? "wait"
            : !textValue?.length
            ? "not-allowed"
            : "pointer",
        }}
      >
        {t("meaning-of-life.call-to-action")}
      </Button>
    </Form>
  );
};
