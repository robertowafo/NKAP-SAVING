export type NewsSource = 'Toutes' | 'EcoMatin' | 'Jeune Afrique' | 'BVMAC' | 'COSUMAF' | 'BEAC';

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  source: Exclude<NewsSource, 'Toutes'>;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'La BVMAC atteint une capitalisation historique au premier trimestre',
    description: 'Le marché financier d\'Afrique centrale montre des signes de forte reprise avec une augmentation de 15% des volumes échangés par rapport à l\'année précédente.',
    content: "La Bourse des Valeurs Mobilières de l'Afrique Centrale a clôturé son premier trimestre avec un record historique.\n\nLe marché a été stimulé par l'introduction de nouvelles valeurs et une participation accrue des investisseurs régionaux. Les volumes de transactions ont connu un bond exceptionnel, témoignant d'une confiance renouvelée des acteurs économiques locaux et internationaux envers le potentiel de développement de la zone CEMAC.\n\nLes analystes prévoient une tendance haussière continue pour le reste de l'année, portée par les réformes structurelles en cours. Cette croissance souligne l'importance d'une infrastructure de marché solide et met en exergue les efforts d'éducation financière déployés dans l'ensemble de la sous-région.",
    source: 'BVMAC',
    date: 'Aujourd\'hui',
    readTime: '4 min',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    category: 'Marchés',
    featured: true,
  },
  {
    id: '2',
    title: 'Nouveau cadre réglementaire pour la tokenisation des actifs en zone CEMAC',
    description: 'La COSUMAF publie de nouvelles directives visant à encadrer l\'émission de tokens adossés à des actifs réels, ouvrant la voie à l\'innovation financière.',
    content: "La Commission de Surveillance du Marché Financier de l'Afrique Centrale a franchi une étape majeure avec la publication d'un projet de cadre régissant les actifs numériques.\n\nDestiné à protéger les investisseurs tout en encourageant la modernisation des financements, ce texte encadre spécifiquement les Security Token Offerings (STO). L'objectif est double : sécuriser les émissions de tokens représentatifs d'actifs réels (immobilier, infrastructures) et créer un environnement propice à l'attraction de capitaux frais.\n\nDivers experts s'accordent à dire que cette décision place la CEMAC à l'avant-garde des réglementations cryptographiques et numériques sur le continent africain, stimulant ainsi les FinTechs émergentes.",
    source: 'COSUMAF',
    date: 'Hier',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1621501103258-3e4bfa35fb54?q=80&w=2070&auto=format&fit=crop',
    category: 'Régulation',
  },
  {
    id: '3',
    title: 'BEAC : Maintien des taux directeurs face à une inflation maîtrisée',
    description: 'Le Comité de Politique Monétaire (CPM) de la BEAC décide de maintenir ses taux inchangés pour soutenir la croissance tout en contenant l\'inflation.',
    content: "Réuni ce mois-ci, le Comité de Politique Monétaire (CPM) de la Banque des États de l'Afrique Centrale a officiellement décidé de maintenir son Taux d'Intérêt des Appels d'Offres (TIAO) à son niveau actuel.\n\nCette stratégie prudente s'explique par un ralentissement perçu de la courbe inflationniste au niveau sous-régional. Bien que le contexte macroéconomique mondial reste incertain, la Banque Centrale privilégie le soutien à la relance économique.\n\nCette décision devrait maintenir des conditions favorables aux emprunts pour les entreprises et les ménages, bien que les banques commerciales restent soumises à de sérieuses règles de provisionnement pour limiter le risque de créances douteuses.",
    source: 'BEAC',
    date: 'Il y a 2 jours',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f929d4?q=80&w=2069&auto=format&fit=crop',
    category: 'Politique Monétaire',
  },
  {
    id: '4',
    title: 'Climat des affaires : Les défis de la numérisation des PME camerounaises',
    description: 'Une enquête exclusive révèle que l\'accès au financement reste le frein principal à la transition numérique de l\'économie locale.',
    content: "Dans son dernier rapport, un panel d'économistes locaux s'est penché sur les verrous structurels empêchant la pleine mutation digitale des PME camerounaises.\n\nLe diagnostic est très clair : bien que la volonté de se digitaliser soit forte pour répondre aux nouveaux modes de consommation, l'accès au financement constitue un goulot d'étranglement sévère. Les produits de crédit traditionnels sont souvent perçus comme trop rigides face à l'immatériel.\n\nDes solutions alternatives telles que le crowdfunding ou les prêts entre particuliers portés par les plateformes régionales s'imposent progressivement comme un relais crucial pour suppléer les institutions traditionnelles.",
    source: 'EcoMatin',
    date: '12 Mai 2026',
    readTime: '3 min',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop',
    category: 'Économie',
  },
  {
    id: '5',
    title: 'Comment les fintechs transforment l\'accès au crédit en Afrique centrale',
    description: 'De l\'inclusion financière à la syndication, les jeunes pousses de la tech bousculent les modèles bancaires traditionnels dans la région.',
    content: "L'écosystème FinTech de la région CEMAC connaît une effervescence remarquable. Ces jeunes entreprises développent des algorithmes de scoring non traditionnels et déploient des interfaces usagers simplifiées.\n\nCette flexibilité permet aujourd'hui à des segments non bancarisés ou sous-bancarisés (auto-entrepreneurs, agriculteurs, étudiants) d'accéder à du micro-crédit via le mobile money. La question n'est plus seulement celle de l'inclusion, mais celle de l'autonomisation et de la création de richesse locale.\n\nLes grandes banques traditionnelles, loin d'ignorer ce phénomène, optent massivement pour des stratégies de partenariats via l'Open Banking pour capter cette dynamique.",
    source: 'Jeune Afrique',
    date: '10 Mai 2026',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    category: 'Tech & Finance',
  },
  {
    id: '6',
    title: 'Lancement d\'une nouvelle obligation verte par un acteur majeur régional',
    description: 'Cotée à la BVMAC, cette opération vise à lever 50 milliards de FCFA pour financer des projets d\'énergie renouvelable.',
    content: "Signe palpable de la transition écologique en cours, une nouvelle obligation 'verte' vient d'être introduite sur la cote de la Bourse Régionale. \n\nConçue pour financer exclusivement des initiatives respectueuses de l'environnement (notamment la biomasse et l'hydroélectricité), l'opération est structurée pour mobiliser jusqu'à 50 milliards de FCFA. Les investisseurs se voient offrir un rendement attractif couplé à une traçabilité rigoureuse de l'utilisation de leurs fonds.\n\nCe type de financement novateur ouvre la porte à de nombreux autres acteurs industriels de la CEMAC soucieux de leur bilan carbone tout en optimisant l'accès à la liquidité du marché.",
    source: 'BVMAC',
    date: '08 Mai 2026',
    readTime: '4 min',
    imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2560&auto=format&fit=crop',
    category: 'Marchés',
  },
];

export const SOURCES: NewsSource[] = ['Toutes', 'EcoMatin', 'Jeune Afrique', 'BVMAC', 'COSUMAF', 'BEAC'];
