
export type HealthLevel = 'High' | 'Medium' | 'Low' | '';
export type SupportProvider = 'Spouse' | 'Children' | 'Other' | '';
export type PrognosisPeriod = '3 Months' | '6 Months' | '1 Year' | '2 Years' | '';
export type InsuranceCoverage = '30%' | '50%' | '70%' | '100%' | '';
export type PassingLocation = 'Home' | 'Hospital' | 'Hospice/Nursing Home' | '';

export interface AudioConsent {
    blobUrl: string | null;
    isRecorded: boolean;
}

export interface FormData {
    personalInfo: {
        surname: string;
        givenName: string;
        sex: string;
        dateOfBirth: string;
        nationality: string;
    };
    healthStatus: {
        selfAssessed: HealthLevel;
        selfAssessedDetails: string;
        diagnosed: HealthLevel;
        diagnosedCondition: string;
        doctorOpinion: string;
    };
    supportSystem: {
        homeCare: SupportProvider[];
        hospitalCare: SupportProvider[];
    };
    prognosisAndInsurance: {
        recoveryPrognosis: PrognosisPeriod;
        hasInsurance: boolean;
        insuranceCoverage: InsuranceCoverage;
    };
    financial: {
        isFamilyProvidedFor: boolean;
        financialWishes: string;
        hasLifeInsurance: boolean;
    };
    wishesAndImpact: {
        futureLifeWishes: string;
        impactOnFamily: string;
    };
    advanceDirective: {
        refuseTreatment: boolean;
        preferredLocation: PassingLocation;
        patientConsent: AudioConsent;
        familyConsent: AudioConsent;
        physicianConsent: AudioConsent;
        familyMemberName: string;
        physicianName: string;
    };
    organDonation: {
        consentToDonate: boolean;
        legalAgreement: boolean;
    };
}

export const initialFormData: FormData = {
    personalInfo: {
        surname: '',
        givenName: '',
        sex: '',
        dateOfBirth: '',
        nationality: '',
    },
    healthStatus: {
        selfAssessed: '',
        selfAssessedDetails: '',
        diagnosed: '',
        diagnosedCondition: '',
        doctorOpinion: '',
    },
    supportSystem: {
        homeCare: [],
        hospitalCare: [],
    },
    prognosisAndInsurance: {
        recoveryPrognosis: '',
        hasInsurance: false,
        insuranceCoverage: '',
    },
    financial: {
        isFamilyProvidedFor: false,
        financialWishes: '',
        hasLifeInsurance: false,
    },
    wishesAndImpact: {
        futureLifeWishes: '',
        impactOnFamily: '',
    },
    advanceDirective: {
        refuseTreatment: false,
        preferredLocation: '',
        patientConsent: { blobUrl: null, isRecorded: false },
        familyConsent: { blobUrl: null, isRecorded: false },
        physicianConsent: { blobUrl: null, isRecorded: false },
        familyMemberName: '',
        physicianName: '',
    },
    organDonation: {
        consentToDonate: false,
        legalAgreement: false,
    },
};
