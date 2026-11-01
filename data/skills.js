// Compétences : catégories neutres, sans pourcentages ni scores artificiels.
window.SKILLS_DATA = {
  hard: [
    {
      category: { fr: "Langages", en: "Languages" },
      items: [
        { name: "HTML5", icon: "devicon-html5-plain" },
        { name: "CSS", icon: "devicon-css3-plain" },
        { name: "JavaScript", icon: "devicon-javascript-plain" },
        { name: "PHP", icon: "devicon-php-plain" }
      ]
    },
    {
      category: { fr: "Front-end", en: "Front-end" },
      items: [
        { name: "HTML5", icon: "devicon-html5-plain" },
        { name: "CSS", icon: "devicon-css3-plain" },
        { name: "JavaScript", icon: "devicon-javascript-plain" },
        { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" }
      ]
    },
    {
      category: { fr: "Back-end", en: "Back-end" },
      items: [
        { name: "PHP", icon: "devicon-php-plain" },
        { name: "Laravel", icon: "devicon-laravel-plain" }
      ]
    },
    {
      category: { fr: "Bases de données", en: "Databases" },
      items: [{ name: "MySQL", icon: "devicon-mysql-plain" }]
    },
    {
      category: { fr: "Outils", en: "Tools" },
      items: [
        { name: "Git", icon: "devicon-git-plain" },
        { name: "GitHub", icon: "devicon-github-original" },
        { name: "Composer", icon: "devicon-composer-plain" }
      ]
    },
    {
      category: { fr: "Systèmes et virtualisation", en: "Systems & virtualization" },
      items: [
        { name: "Linux", icon: "devicon-linux-plain" },
        { name: "Virtualisation", icon: "devicon-vagrant-plain" }
      ]
    }
  ],
  soft: {
    fr: ["Gestion de projet", "Organisation", "Communication", "Résolution de problèmes", "Collaboration", "Apprentissage autonome"],
    en: ["Project management", "Organization", "Communication", "Problem solving", "Collaboration", "Self-directed learning"]
  },
  // Technologies affichées dans la bande défilante
  marquee: ["HTML5", "CSS", "JavaScript", "PHP", "Laravel", "MySQL", "Tailwind CSS", "Git", "GitHub", "Composer"]
};