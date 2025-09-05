import { Award, Shield } from "lucide-react";
export const CERTIFICATION_IDS = {
    DEVELOPER: "optimizely-saas-developer",
    EXPERT: "optimizely-saas-expert-developer"
}
export const certificationOptions = [
    {
        id: CERTIFICATION_IDS.DEVELOPER,
        title: "Optimizely SaaS CMS Developer Certification",
        description: "Foundational understanding of Optimizely SaaS CMS",
        icon: Shield,
        duration: "4-6 weeks",
        difficulty: "Beginner",
    },
    {
        id: CERTIFICATION_IDS.EXPERT,
        title: "Optimizely SaaS CMS Developer Expert Certification",
        description: "Advance understanding of Optimizely SaaS CMS",
        icon: Award,
        duration: "8-12 weeks",
        difficulty: "Expert",
    }
];