import { ESubmissionState, environmentVariables } from "./constants";
import {
  saveMeaning,
  submissionStateToBackgroundColorVariable,
} from "./utilities";

describe("Utility functions", () => {
  describe("submissionStateToBackgroundColorVariable", () => {
    it("should return the pre-submission-background CSS variable if submission state is not an expected value", () => {
      const expected =
        "var(--pre-submmission-background, rgba(255, 255, 0, 1))";

      expect(
        submissionStateToBackgroundColorVariable("invalid" as ESubmissionState)
      ).toBe(expected);

      expect(
        submissionStateToBackgroundColorVariable("0" as ESubmissionState)
      ).toBe(expected);

      expect(
        submissionStateToBackgroundColorVariable("bad" as ESubmissionState)
      ).toBe(expected);
    });

    it('should return the pre-submission-background CSS variable if submission state is "idle" or "pending"', () => {
      const expected = "var(--pre-submmission-background)";

      expect(
        submissionStateToBackgroundColorVariable(ESubmissionState.Idle)
      ).toBe(expected);

      expect(
        submissionStateToBackgroundColorVariable(ESubmissionState.Pending)
      ).toBe(expected);
    });

    it('should return the successful-submission-background CSS variable if submission state is "success"', () => {
      const expected = "var(--successful-submission-background)";

      expect(
        submissionStateToBackgroundColorVariable(ESubmissionState.Success)
      ).toBe(expected);
    });

    it('should return the failed-submission-background CSS variable if submission state is "failure"', () => {
      const expected = "var(--failed-submission-background)";

      expect(
        submissionStateToBackgroundColorVariable(ESubmissionState.Failure)
      ).toBe(expected);
    });
  });

  describe("saveMeaning", () => {
    it("should correctly send the data to the API", async () => {
      const fetchMock = jest
        .spyOn(global, "fetch")
        .mockResolvedValue(new Response("This is the response"));

      const response = await saveMeaning({ text: "This is a test!" });

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        `${environmentVariables.API_ROOT}v1/meaning`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ text: "This is a test!" }),
        }
      );
      expect(response).toEqual({
        success: true,
        message: "meaning-of-life.saved",
      });
    });

    it("should send back a code and reason on API failure (status not in the range of 200-299)", async () => {
      jest
        .spyOn(global, "fetch")
        .mockResolvedValue(new Response(null, { status: 400 }));

      const response = await saveMeaning({ text: "This is a test!" });

      expect(response).toEqual({
        success: false,
        code: 400,
        reason: "meaning-of-life.errors.unable-to-save",
      });
    });
  });
});
