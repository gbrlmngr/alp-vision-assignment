import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import * as utilities from "./lib/utilities";
import { ESubmissionState } from "./lib/constants";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: jest.fn((v) => v),
  }),
  initReactI18next: {
    type: "3rdparty",
    init: jest.fn(),
  },
}));

const testIds = {
  root: "meaning-of-life",
  input: "meaning-of-life/input",
  callToAction: "meaning-of-life/call-to-action",
  apiResponseIndicator: "meaning-of-life/api-indicator",
};

describe("<App /> component", () => {
  afterEach(jest.clearAllMocks);

  it("should correctly render the page content", async () => {
    const backgroundColorSpy = jest.spyOn(
      utilities,
      "submissionStateToBackgroundColorVariable"
    );
    render(<App />);

    [
      "meaning-of-life.primary-label.0",
      "meaning-of-life.primary-label.1",
      "meaning-of-life.primary-label.2",
    ].forEach((value) => {
      expect(screen.getByTestId(testIds.root)).toHaveTextContent(value);
    });

    [testIds.input, testIds.callToAction].forEach((element) => {
      expect(screen.getByTestId(element)).toBeInTheDocument();
    });

    expect(backgroundColorSpy).toHaveBeenNthCalledWith(
      1,
      ESubmissionState.Idle
    );
  });

  it("should correctly update the page on a successful save", async () => {
    const userAction = userEvent.setup();
    jest
      .spyOn(utilities, "saveMeaning")
      .mockResolvedValue({ success: true, message: "Saved" });
    const backgroundColorSpy = jest.spyOn(
      utilities,
      "submissionStateToBackgroundColorVariable"
    );
    render(<App />);

    await act(async () => {
      await userAction.type(
        screen.getByTestId(testIds.input),
        "This is a test!"
      );

      await userAction.click(screen.getByTestId(testIds.callToAction));
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.apiResponseIndicator)
      ).toHaveTextContent("Saved");
    });

    expect(backgroundColorSpy).toHaveBeenNthCalledWith(
      2,
      ESubmissionState.Success
    );
  });

  it("should correctly update the page on a failed save", async () => {
    const userAction = userEvent.setup();
    jest
      .spyOn(utilities, "saveMeaning")
      .mockResolvedValue({ success: false, code: 0, reason: "Not saved" });
    const backgroundColorSpy = jest.spyOn(
      utilities,
      "submissionStateToBackgroundColorVariable"
    );
    render(<App />);

    await act(async () => {
      await userAction.type(
        screen.getByTestId(testIds.input),
        "This is a test!"
      );

      await userAction.click(screen.getByTestId(testIds.callToAction));
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(testIds.apiResponseIndicator)
      ).toHaveTextContent("Not saved");
    });

    expect(backgroundColorSpy).toHaveBeenNthCalledWith(
      2,
      ESubmissionState.Failure
    );
  });
});
