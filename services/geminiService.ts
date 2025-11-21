import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, AIAnalysisResult, UserType } from "../types";

// -----------------------------
// IMPORTANT: API KEY FIXED HERE
// -----------------------------
const getAIClient = () => {
  // Vite exposes environment variables only via import.meta.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is missing");
  }

  return new GoogleGenAI({ apiKey });
};

// Convert uploaded resume to generative part
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

// -----------------------------
// RESUME PARSER
// -----------------------------
export const parseResume = async (
  file: File
): Promise<Partial<UserProfile>> => {
  const ai = getAIClient();

  try {
    const filePart = await fileToGenerativePart(file);

    const prompt = `
      You are an intelligent resume parser for an immigration platform. Extract:
      - Full Name
      - Country of residence
      - Highest Degree: High School, Diploma, Bachelor, Master, PhD
      - Field of study
      - Total years of work experience
      - IELTS/CELPIP English score (if available)
      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [filePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            country: { type: Type.STRING },
            educationLevel: {
              type: Type.STRING,
              enum: ["High School", "Diploma", "Bachelor", "Master", "PhD"],
            },
            fieldOfStudy: { type: Type.STRING },
            workExperienceYears: { type: Type.NUMBER },
            englishScore: { type: Type.NUMBER },
          },
          required: [
            "name",
            "educationLevel",
            "fieldOfStudy",
            "workExperienceYears",
          ],
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);

      return {
        name: data.name,
        countryOfResidence: data.country || undefined,
        educationLevel: data.educationLevel,
        fieldOfStudy: data.fieldOfStudy,
        workExperienceYears: data.workExperienceYears,
        englishScore: data.englishScore,
      } as Partial<UserProfile>;
    }

    return {};
  } catch (error) {
    console.error("Error parsing resume:", error);
    return {};
  }
};

// -----------------------------
// PROFILE ANALYSIS
// -----------------------------
export const analyzeProfile = async (
  profile: UserProfile,
  userType: UserType
): Promise<AIAnalysisResult> => {
  const ai = getAIClient();

  // Specific instructions based on student/worker
  let specificInstructions = "";

  if (userType === UserType.Student) {
    specificInstructions = `
      CONTEXT: STUDENT.
      1. Visa approval probability.
      2. Suggest DLIs (ApplyBoard-like).
      3. CRS Predictions: Current, 1-year study, 2-year study, 2-year study + 1-year work.
    `;
  } else {
    specificInstructions = `
      CONTEXT: SKILLED WORKER.
      Include Express Entry (CEC/FSWP/Category Based) + PNP.
      - Job offer: ${profile.hasJobOffer}
      - TEER: ${profile.jobOfferTeer}
    `;
  }

  const englishInfo = profile.languageDetails
    ? `${profile.languageDetails.testType} - Overall: ${profile.languageDetails.overallScore}`
    : "None";

  const frenchInfo =
    profile.frenchDetails && profile.frenchDetails.testType !== "None"
      ? `${profile.frenchDetails.testType} - Overall: ${profile.frenchDetails.overallScore}`
      : "None";

  const commonPrompt = `
    Profile:
    - Name: ${profile.name}
    - Age: ${profile.age}
    - Country: ${profile.countryOfResidence}
    - Education: ${profile.educationLevel}
    - Work: ${profile.workExperienceYears} years
    - English: ${englishInfo}
    - French: ${frenchInfo}
    - Savings: ${profile.savings}
    - Settlement Funds: ${profile.settlementFunds}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are a Canadian Immigration expert.
        ${specificInstructions}
        ${commonPrompt}

        IMPORTANT ASSUMPTIONS:
        1. IELTS Academic → treat as IELTS General.
        2. Student no English score → assume CLB5.
        3. Worker no score → 0 points.
        
        Return JSON structured exactly as schema.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallSuccessProbability: { type: Type.NUMBER },
            crsScorePrediction: { type: Type.NUMBER },
            futureCrsPredictions: {
              type: Type.OBJECT,
              properties: {
                current: { type: Type.NUMBER },
                oneYearStudy: { type: Type.NUMBER },
                twoYearStudy: { type: Type.NUMBER },
                twoYearStudyPlusWork: { type: Type.NUMBER },
              },
            },
            riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            assumptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedPathways: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  eligibilityScore: { type: Type.NUMBER },
                  timeline: { type: Type.STRING },
                  type: {
                    type: Type.STRING,
                    enum: ["Federal", "Provincial", "Study", "Business", "Family"],
                  },
                },
              },
            },
            otherPathways: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  eligibilityScore: { type: Type.NUMBER },
                  timeline: { type: Type.STRING },
                  type: {
                    type: Type.STRING,
                    enum: ["Federal", "Provincial", "Study", "Business", "Family"],
                  },
                },
              },
            },
            strategicAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            studyRecommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  programName: { type: Type.STRING },
                  institution: { type: Type.STRING },
                  location: { type: Type.STRING },
                  tuition: { type: Type.STRING },
                  matchReason: { type: Type.STRING },
                },
              },
            },
          },
          required: [
            "overallSuccessProbability",
            "crsScorePrediction",
            "riskFactors",
            "strengths",
            "assumptions",
            "recommendedPathways",
            "otherPathways",
            "strategicAdvice",
          ],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResult;
    }

    throw new Error("No response from AI");
  } catch (error) {
    console.error("Error analyzing profile:", error);

    // fallback response
    return {
      overallSuccessProbability: 75,
      crsScorePrediction: 320,
      futureCrsPredictions: {
        current: 320,
        oneYearStudy: 345,
        twoYearStudy: 360,
        twoYearStudyPlusWork: 475,
      },
      riskFactors: ["Study gap"],
      strengths: ["Funds available"],
      assumptions: ["Fallback used due to API error"],
      recommendedPathways: [],
      otherPathways: [],
      strategicAdvice: ["Improve IELTS", "Consider PG diploma"],
      studyRecommendations: [],
    };
  }
};
