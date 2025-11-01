
import { GoogleGenAI } from "@google/genai";
import { FormData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const formatArray = (arr: string[]) => arr.length > 0 ? arr.join(', ') : 'None specified';

export const generateDirectiveSummary = async (formData: FormData): Promise<string> => {
    const {
        personalInfo: pi,
        healthStatus: hs,
        supportSystem: ss,
        prognosisAndInsurance: pai,
        financial: fin,
        wishesAndImpact: wai,
        advanceDirective: ad,
        organDonation: od
    } = formData;

    const prompt = `
        Based on the following information, act as a compassionate and professional scribe to draft a clear, respectful, and legally-phrased Advance Directive and Statement of Wishes. The tone should be formal yet personal, accurately reflecting the individual's choices. Structure the output in Markdown format.

        **1. Personal Information:**
        - Name: ${pi.givenName} ${pi.surname}
        - Date of Birth: ${pi.dateOfBirth}
        - Sex: ${pi.sex}
        - Nationality: ${pi.nationality}

        **2. Health Status Summary:**
        - Self-Assessed Health: ${hs.selfAssessed} (${hs.selfAssessedDetails})
        - Medical Diagnosis: ${hs.diagnosed}, with the condition of "${hs.diagnosedCondition}"
        - Physician's Opinion: ${hs.doctorOpinion}
        - Recovery Prognosis: ${pai.recoveryPrognosis}

        **3. Support System:**
        - Home Care Provided By: ${formatArray(ss.homeCare)}
        - Hospital Care Provided By: ${formatArray(ss.hospitalCare)}

        **4. End-of-Life Directives:**
        - Life-Sustaining Treatment: ${ad.refuseTreatment ? "The individual has expressed a clear wish to REFUSE life-sustaining treatment if their condition is deemed irrecoverable and consciousness is significantly diminished." : "The individual has not opted to refuse life-sustaining treatment at this time."}
        - Preferred Location for End-of-Life Care: ${ad.preferredLocation || "Not specified."}
        - Consents: Verbal consents have been recorded from the Patient, a Family Member (${ad.familyMemberName}), and the Primary Physician (${ad.physicianName}).

        **5. Personal Wishes & Considerations:**
        - Hopes for the Future: "${wai.futureLifeWishes}"
        - Reflections on Family Impact: "${wai.impactOnFamily}"

        **6. Financial & Insurance Status:**
        - Medical Insurance: ${pai.hasInsurance ? `Yes, with ${pai.insuranceCoverage} coverage.` : "No"}
        - Life Insurance: ${fin.hasLifeInsurance ? "Yes" : "No"}
        - Financial Provisions for Family: ${fin.isFamilyProvidedFor ? "The individual states their family's financial needs are met." : `The individual has expressed the following wishes regarding family finances: "${fin.financialWishes}"`}
        
        **7. Post-Mortem Wishes:**
        - Organ Donation: ${od.consentToDonate ? "The individual CONSENTS to organ donation to help others in need." : "The individual does NOT consent to organ donation."}

        **Drafting Task:**
        Please synthesize this information into a formal document titled "Advance Directive and Statement of Wishes for ${pi.givenName} ${pi.surname}". Use clear headings for each section. Convert the provided data into well-formed sentences that convey the gravity and clarity of these decisions. Conclude with the statement of legal understanding provided by the individual.
    `;

    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating summary with Gemini:", error);
        return "There was an error generating the summary. Please check the console for details.";
    }
};
