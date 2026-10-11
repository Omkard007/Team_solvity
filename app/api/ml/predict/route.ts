import { NextResponse } from "next/server";
import { predictCaseOutcome, type OutcomePredictionInput } from "@/lib/ml";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      noticePeriodGivenDays = 2,
      statutoryRequiredDays = 15,
      wasHearingGranted = false,
      isRegularisationCompoundingPending = true,
      courtLevel = "High Court",
      caseType = "Demolition / Civic Notice",
    } = body;

    const input: OutcomePredictionInput = {
      noticePeriodGivenDays: Number(noticePeriodGivenDays),
      statutoryRequiredDays: Number(statutoryRequiredDays),
      wasHearingGranted: Boolean(wasHearingGranted),
      isRegularisationCompoundingPending: Boolean(isRegularisationCompoundingPending),
      courtLevel: courtLevel as OutcomePredictionInput["courtLevel"],
      caseType,
    };

    const prediction = predictCaseOutcome(input);
    return NextResponse.json(prediction);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "ML prediction error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
