// Compétences : catégories neutres, sans pourcentages ni scores artificiels.
window.SKILLS_DATA = {
  hard: [
    { category: { fr: "Langages", en: "Languages" }, items: ["HTML5", "CSS", "JavaScript", "PHP"] },
    { category: { fr: "Front-end", en: "Front-end" }, items: ["HTML5", "CSS", "JavaScript", "Tailwind CSS"] },
    { category: { fr: "Back-end", en: "Back-end" }, items: ["PHP", "Laravel"] },
    { category: { fr: "Bases de données", en: "Databases" }, items: ["MySQL"] },
    { category: { fr: "Outils", en: "Tools" }, items: ["Git", "GitHub", "Composer"] }
  ],
  soft: {
    fr: ["Gestion de projet", "Organisation", "Communication", "Résolution de problèmes", "Collaboration", "Apprentissage autonome"],
    en: ["Project management", "Organization", "Communication", "Problem solving", "Collaboration", "Self-directed learning"]
  },
  // Technologies affichées dans la bande défilante
  marquee: ["HTML5", "CSS", "JavaScript", "PHP", "Laravel", "MySQL", "Tailwind CSS", "Git", "GitHub", "Composer"]
};