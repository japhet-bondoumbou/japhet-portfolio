// Base locale des diplômes, certificats et attestations.
// type : "diploma" | "certificate" | "attestation" | "training"
window.CREDENTIALS_DATA = [
  {
    id: "licence-genie-logiciel",
    type: "diploma",
    title: { fr: "Licence en génie logiciel", en: "Bachelor's degree in Software Engineering" },
    issuer: "ESGAE — École Supérieure de Gestion et d'Administration des Entreprises, Brazzaville",
    year: "2024 – en cours",
    description: {
      fr: "Formation en cours. Cursus de licence en génie logiciel.",
      en: "Ongoing program. Software engineering bachelor's curriculum."
    },
    image: "",
    pdf: "",
    reference: ""
  },
  {
    id: "bts-informatique-gestion",
    type: "diploma",
    title: { fr: "BTS en informatique de gestion", en: "BTS in Business IT" },
    issuer: "ESGAE",
    year: "2026",
    description: {
      fr: "Brevet de technicien supérieur en informatique de gestion. Intitulé exact du document officiel à conserver.",
      en: "Higher technician certificate in business IT. Exact wording from the official document to be preserved."
    },
    image: "",
    pdf: "",
    reference: ""
  },
  {
    id: "bac-scientifique",
    type: "diploma",
    title: { fr: "Baccalauréat scientifique", en: "Scientific Baccalaureate" },
    issuer: "Christophe Mapika",
    year: "2024",
    description: {
      fr: "Baccalauréat série scientifique.",
      en: "Scientific track baccalaureate."
    },
    image: "",
    pdf: "",
    reference: ""
  },
  {
    id: "unicef-transformation-numerique",
    type: "certificate",
    title: { fr: "Transformation numérique fondée sur les droits", en: "Rights-based Digital Transformation" },
    issuer: "UNICEF — via la plateforme AGORA",
    year: "2026",
    description: {
      fr: "Certification en ligne sur la transformation numérique fondée sur les droits.",
      en: "Online certification on rights-based digital transformation."
    },
    image: "",
    pdf: "",
    reference: ""
  },
  {
    id: "bsafe-undss",
    type: "certificate",
    title: { fr: "BSAFE", en: "BSAFE" },
    issuer: "UNDSS / Nations Unies",
    year: "2026",
    description: {
      fr: "Certification de sécurité des Nations Unies.",
      en: "United Nations security certification."
    },
    image: "assets/certificates/images/UN-BSAFE.png",
    pdf: "assets/certificates/pdf/Certificate.pdf",
    reference: ""
  },
  {
    id: "formation-c",
    type: "attestation",
    title: { fr: "Programmation en langage C", en: "C programming" },
    issuer: "Fondation Privat Frédéric Ndeke",
    year: "2023",
    description: {
      fr: "Attestation de formation en programmation en langage C.",
      en: "Training certificate in C programming."
    },
    image: "",
    pdf: "",
    reference: ""
  },
  {
    id: "cloud-code-101",
    type: "certificate",
    kind: { fr: "Badge de complétion", en: "Completion badge" },
    title: { fr: "Claud Code 101", en: "Cload Code 101" },
    issuer: "Claud Academy",
    date: { fr: "24 octobre 2026", en: "October 24, 2026" },
    image: "assets/certificates/images/Claud-Code-101.png",
    pdf: "assets/certificates/pdf/Claud-Code-101.pdf",
    reference: ""
  },
  {
    id: "collaborer-avec-microsoft-365",
    type: "certificate",
    kind: { fr: "Certificat de réussite", en: "Certificate of completion" },
    title: { fr: "Collaborer avec Microsoft 365", en: "Collaborating with Microsoft 365" },
    issuer: "LinkedIn Learning",
    platform: "MTN Skills Academy",
    date: { fr: "6 octobre 2026", en: "October 6, 2026" },
    image: "assets/certificates/images/Collaborer-avec-Microsoft-365.png",
    pdf: "assets/certificates/pdf/Collaborer-avec-Microsoft-365.pdf",
    reference: ""
  },
  {
    id: "competences-internet-utilisation-quotidienne",
    type: "certificate",
    kind: { fr: "Certificat", en: "Certificate" },
    title: { fr: "Compétences Internet pour une utilisation quotidienne", en: "Internet skills for everyday use" },
    issuer: "GSMA",
    platform: "MTN Skills Academy",
    image: "assets/certificates/images/Competences-Internet-pour-une-utilisation-quotidienne.png",
    pdf: "assets/certificates/pdf/Competences-Internet-pour-une-utilisation-quotidienne.pdf",
    reference: ""
  },
  {
    id: "numerique-application-competences-internet",
    type: "certificate",
    kind: { fr: "Certificat", en: "Certificate" },
    title: { fr: "Numérique, meilleure application et compétences Internet pour une utilisation", en: "Digital skills, better application and Internet skills for use" },
    issuer: "GSMA",
    platform: "MTN Skills Academy",
    date: { fr: "3 octobre 2026", en: "October 3, 2026" },
    image: "assets/certificates/images/Numerique-meilleure-application-et-competences-Internet-pour-une-utilisation.png",
    pdf: "assets/certificates/pdf/Numerique-meilleure-application-et-competences-Internet-pour-une-utilisation.pdf",
    reference: ""
  },
  {
    id: "ia-responsable",
    type: "certificate",
    kind: { fr: "Certificat", en: "Certificate" },
    title: { fr: "IA responsable", en: "Responsible AI" },
    issuer: "Microsoft Learn",
    platform: "MTN Skills Academy",
    image: "assets/certificates/images/IA-responsable.png",
    pdf: "assets/certificates/pdf/IA-responsable.pdf",
    reference: ""
  },
  {
    id: "fondamentaux-internet",
    type: "certificate",
    kind: { fr: "Certificat", en: "Certificate" },
    title: { fr: "Les fondamentaux d'Internet", en: "Internet fundamentals" },
    issuer: "GSMA",
    platform: "MTN Skills Academy",
    date: { fr: "2 octobre 2026", en: "October 2, 2026" },
    image: "assets/certificates/images/Les-fondamentaux-d-Internet.png",
    pdf: "assets/certificates/pdf/Les-fondamentaux-d-Internet.pdf",
    reference: ""
  },
  {
    id: "ia-pour-tous",
    type: "certificate",
    kind: { fr: "Certificat", en: "Certificate" },
    title: { fr: "L'IA pour tous", en: "AI for everyone" },
    issuer: "Microsoft Learn",
    platform: "MTN Skills Academy",
    date: { fr: "30 septembre 2026", en: "September 30, 2026" },
    image: "assets/certificates/images/L-IA-pour-tous.png",
    pdf: "assets/certificates/pdf/L-IA-pour-tous.pdf",
    reference: ""
  },
  {
    id: "premier-pas-microsoft-365",
    type: "certificate",
    kind: { fr: "Certificat", en: "Certificate" },
    title: { fr: "Premier pas avec Microsoft 365", en: "Getting started with Microsoft 365" },
    issuer: "LinkedIn Learning",
    platform: "MTN Skills Academy",
    image: "assets/certificates/images/Premier-pas-avec-Microsoft-365.png",
    pdf: "assets/certificates/pdf/Premier-pas-avec-Microsoft-365.pdf",
    reference: ""
  }
];