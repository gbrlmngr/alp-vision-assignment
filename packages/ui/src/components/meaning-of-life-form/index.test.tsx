import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MeaningOfLifeForm } from ".";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: jest.fn((v) => v),
  }),
}));

const onSubmitMock = jest.fn();
const onInvalidMock = jest.fn();

const testIds = {
  input: "meaning-of-life/input",
  inputHint: "meaning-of-life/input/hint",
  validationError: "meaning-of-life/input/validation-error",
  lengthIndicator: "meaning-of-life/input/length-indicator",
  callToAction: "meaning-of-life/call-to-action",
};

describe("<MeaningOfLife /> component", () => {
  afterEach(jest.clearAllMocks);

  it("should correctly render the form in the default state", async () => {
    render(<MeaningOfLifeForm onSubmit={onSubmitMock} />);

    expect(screen.getByTestId(testIds.input)).toBeVisible();
    expect(screen.getByTestId(testIds.inputHint)).toBeVisible();
    expect(screen.getByTestId(testIds.callToAction)).toBeVisible();
    expect(screen.getByTestId(testIds.lengthIndicator)).toHaveTextContent(
      "0/100"
    );
  });

  it("should trigger the submission (onSubmit) if form is valid", async () => {
    const userAction = userEvent.setup();

    render(<MeaningOfLifeForm onSubmit={onSubmitMock} />);

    expect(onSubmitMock).not.toHaveBeenCalled();

    await act(async () => {
      /**
       * @see @alp-vision-assignment/shared/dist/validation-schemas/meaning-of-life
       * To be valid, the input content should be between 1 and 100 characters long
       */
      await userAction.type(
        screen.getByTestId(testIds.input),
        "This is a test!"
      );

      expect(screen.getByTestId(testIds.lengthIndicator)).toHaveTextContent(
        "15/100"
      );
      await userAction.click(screen.getByTestId(testIds.callToAction));
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ text: "This is a test!" });
  });

  /**
   * Since writing this test, I've decided that
   * the button should be disabled if the input is empty.
   * If the requirements change, the `.skip` clause can be removed to enable back the test.
   */
  it.skip("should trigger the invalidation (onInvalid) if form is invalid (less than 1 characters)", async () => {
    const userAction = userEvent.setup();

    render(
      <MeaningOfLifeForm onSubmit={onSubmitMock} onInvalid={onInvalidMock} />
    );

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(onInvalidMock).not.toHaveBeenCalled();

    await act(async () => {
      /**
       * @see @alp-vision-assignment/shared/dist/validation-schemas/meaning-of-life
       * To be valid, the input content should be between 1 and 100 characters long
       */
      await userAction.type(screen.getByTestId(testIds.input), "{space}");

      await userAction.clear(screen.getByTestId(testIds.input));
      expect(screen.getByTestId(testIds.lengthIndicator)).toHaveTextContent(
        "0/100"
      );

      await userAction.click(screen.getByTestId(testIds.callToAction));
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(onInvalidMock).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId(testIds.validationError)).toHaveTextContent(
      "forms.validation-errors.min-1-char"
    );
  });

  it("should trigger the invalidation (onInvalid) if form is invalid (more than 100 characters)", async () => {
    const userAction = userEvent.setup();

    render(
      <MeaningOfLifeForm onSubmit={onSubmitMock} onInvalid={onInvalidMock} />
    );

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(onInvalidMock).not.toHaveBeenCalled();

    await act(async () => {
      /**
       * @see @alp-vision-assignment/shared/dist/validation-schemas/meaning-of-life
       * To be valid, the input content should be between 1 and 100 characters long
       */
      await userAction.type(
        screen.getByTestId(testIds.input),

        /**
         * Generates 101 random A-Z characters
         */
        Array.from({ length: 101 }, () =>
          String.fromCodePoint(Math.floor(Math.random() * (90 - 65) + 65))
        ).join("")
      );

      expect(screen.getByTestId(testIds.lengthIndicator)).toHaveTextContent(
        "101/100"
      );
      await userAction.click(screen.getByTestId(testIds.callToAction));
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(onInvalidMock).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId(testIds.validationError)).toHaveTextContent(
      "forms.validation-errors.max-100-chars"
    );
  });

  it("should not account for spaces between or after the input", async () => {
    const userAction = userEvent.setup();

    render(<MeaningOfLifeForm onSubmit={onSubmitMock} />);

    await act(async () => {
      await userAction.type(screen.getByTestId(testIds.input), " ");

      expect(screen.getByTestId(testIds.callToAction)).toHaveAttribute(
        "disabled"
      );

      await userAction.type(
        screen.getByTestId(testIds.input),
        "   This is a test!   "
      );
    });

    expect(screen.getByTestId(testIds.lengthIndicator)).toHaveTextContent(
      "15/100"
    );
    expect(screen.getByTestId(testIds.lengthIndicator)).not.toHaveTextContent(
      "21/100"
    );
  });
});
