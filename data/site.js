// Données centrales du site. Modifiez ces valeurs pour personnaliser le portfolio.
window.SITE_DATA = {
  domain: "https://japhet-portfolio-nu.vercel.app", // Domaine réel — mettez à jour après déploiement
  name: "Japhet Bondoumbou",
  fullName: "BONDOUMBOU PEYA Japhet Richiland",
  title: {
    fr: "Étudiant en génie logiciel | Développeur logiciel",
    en: "Software Engineering Student | Software Developer"
  },
  location: {
    fr: "Brazzaville, République du Congo",
    en: "Brazzaville, Republic of the Congo"
  },
  profilePhoto: "assets/images/profile/placeholder.svg", // Remplacer par votre photo (ratio 1:1)
  phone: "+242 06 553 7163",
  email: "japhetbondoumboup@gmail.com",
  whatsapp: "242065537163",
  cv: "assets/documents/cv.pdf", // À fournir dans assets/documents/
  social: {
    github: "https://github.com/japhet-bondoumbou",
    linkedin: "",
    x: "https://x.com/JaphetBon",
    facebook: "https://www.facebook.com/share/1K2JbgrgyU/",
    instagram: "https://www.instagram.com/iam_richlandj?srtk=bnR4dmN0dG9yNnJ5"
  },
  hero: {
    heading: {
      fr: "Je conçois des solutions numériques utiles et bien pensées.",
      en: "I build useful, thoughtfully designed digital solutions."
    },
    subtitle: {
      fr: "Étudiant en génie logiciel et développeur orienté vers la conception d'applications et de solutions web utiles aux entreprises et aux utilisateurs.",
      en: "Software engineering student and developer focused on designing applications and web solutions that serve businesses and users."
    },
    typed: {
      fr: ["Développement web", "Conception logicielle", "Applications numériques", "Solutions utiles aux entreprises"],
      en: ["Web development", "Software design", "Digital applications", "Business-oriented solutions"]
    }
  },
  // Statistiques : laisser null pour calcul automatique à partir des données
  stats: {
    projects: null,
    credentials: null,
    skills: null,
    experiences: null
  },
  experiences: [
    {
      id: "arpce",
      org: "ARPCE, Brazzaville",
      year: "2026",
      role: { fr: "Stage académique", en: "Academic internship" },
      description: {
        fr: "Stage académique. Les missions détaillées seront précisées ultérieurement.",
        en: "Academic internship. Detailed tasks will be specified later."
      }
    },
    {
      id: "acsi",
      org: "ACSI — Agence Congolaise des Systèmes d'Information, Brazzaville",
      year: "2026",
      role: { fr: "Stage académique", en: "Academic internship" },
      description: {
        fr: "Stage académique. Les missions détaillées seront précisées ultérieurement.",
        en: "Academic internship. Detailed tasks will be specified later."
      }
    },
    {
      id: "oyo",
      org: "Gare routière d'Oyo",
      year: "2025",
      role: { fr: "Assistant directeur", en: "Assistant to the Director" },
      description: {
        fr: "Expérience professionnelle en organisation et support administratif.",
        en: "Professional experience in organization and administrative support."
      }
    }
  ],
  brand: "Japhet Bondoumbou",
  credit: {
    fr: "Conçu et développé par Japhet Bondoumbou.",
    en: "Designed and built by Japhet Bondoumbou."
  }
};