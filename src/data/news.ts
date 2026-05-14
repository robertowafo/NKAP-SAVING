export interface Article {
  id: string;
  titre: string;
  source: NewsSource;
  date: string;
  resume: string;
  contenu: string;
  imageUrl: string;
  categorie: string;
  tempsLecture: number;
  featured?: boolean;
}

export type NewsSource = 'EcoMatin' | 'Jeune Afrique' | 'BVMAC' | 'COSUMAF' | 'BEAC' | 'Toutes';

export const SOURCES: NewsSource[] = ['Toutes', 'EcoMatin', 'Jeune Afrique', 'BVMAC', 'COSUMAF', 'BEAC'];

export const ARTICLES: Article[] = [
  {
    id: '1',
    titre: 'La BVMAC franchit un nouveau record avec 4,2 milliards XAF échangés en avril 2026',
    source: 'BVMAC',
    date: '5 mai 2026',
    resume: 'Le marché boursier de l\'Afrique Centrale enregistre un volume historique porté par la forte demande sur les obligations d\'État camerounaises.',
    contenu: 'La Bourse des Valeurs Mobilières de l\'Afrique Centrale (BVMAC) a annoncé ce lundi que le mois d\'avril 2026 a vu un volume d\'échanges record de 4,2 milliards XAF. Cette performance est principalement portée par les obligations souveraines du Cameroun et du Gabon, qui représentent 68% des transactions. Les analystes attribuent cette dynamique à la baisse du taux directeur de la BEAC en mars dernier, rendant les marchés de capitaux plus attractifs pour les investisseurs institutionnels de la sous-région.',
    imageUrl: '/hero-background.jpeg',
    categorie: 'Marches',
    tempsLecture: 4,
    featured: true,
  },
  {
    id: '2',
    titre: 'COSUMAF : nouvelles règles pour l\'agrément des plateformes d\'investissement digital',
    source: 'COSUMAF',
    date: '3 mai 2026',
    resume: 'Le régulateur des marchés financiers CEMAC publie un cadre réglementaire pour les fintechs souhaitant opérer dans l\'investissement digital.',
    contenu: 'La Commission de Surveillance du Marché Financier de l\'Afrique Centrale (COSUMAF) a publié un nouveau cadre réglementaire encadrant les plateformes d\'investissement numérique. Ce texte, attendu depuis 2024, définit les conditions d\'agrément, les obligations de reporting et les exigences en fonds propres pour les acteurs fintech souhaitant proposer des produits d\'investissement aux particuliers et aux entreprises de la zone CEMAC.',
    imageUrl: '/Institutionnels.jpeg',
    categorie: 'Réglementation',
    tempsLecture: 6,
  },
  {
    id: '3',
    titre: 'Financement islamique : la BEAC publie ses lignes directrices pour les sukuk CEMAC',
    source: 'BEAC',
    date: '29 avril 2026',
    resume: 'La banque centrale autorise officiellement l\'émission de sukuk souverains dans la zone, ouvrant la voie à une finance alternative halal structurée.',
    contenu: 'La Banque des États de l\'Afrique Centrale (BEAC) a franchi une étape historique en publiant ses lignes directrices pour l\'émission et la négociation de sukuk dans la zone CEMAC. Cette décision s\'inscrit dans le cadre du Plan Stratégique 2025-2030 de la BEAC visant à diversifier les instruments financiers disponibles dans la région. Les premiers sukuk souverains pourraient être émis dès le deuxième semestre 2026.',
    imageUrl: '/Finance Islamique.jpeg',
    categorie: 'Finance Islamique',
    tempsLecture: 5,
  },
  {
    id: '4',
    titre: 'PME camerounaises : le taux de bancarisation passe à 22% grâce au Mobile Money',
    source: 'EcoMatin',
    date: '27 avril 2026',
    resume: 'Une étude du Groupement Inter-Patronal du Cameroun révèle une progression significative de l\'inclusion financière portée par MTN MoMo et Orange Money.',
    contenu: 'Selon une étude publiée par le GICAM, le taux de bancarisation des PME camerounaises a atteint 22% au premier trimestre 2026, contre 17% en 2024. Cette progression est principalement attribuée aux services de Mobile Money qui permettent désormais aux petites entreprises d\'accéder à des crédits, d\'effectuer des paiements fournisseurs et de gérer leur trésorerie via smartphone.',
    imageUrl: '/Mobile Money.jpeg',
    categorie: 'Inclusion financière',
    tempsLecture: 3,
  },
  {
    id: '5',
    titre: 'Tokenisation immobilière : Polygon devient le blockchain de référence en Afrique centrale',
    source: 'Jeune Afrique',
    date: '22 avril 2026',
    resume: 'Les projets de tokenisation d\'actifs réels se multiplient en zone CEMAC, avec Polygon EVM comme infrastructure blockchain dominante.',
    contenu: 'La tokenisation d\'actifs réels — immobilier, plantations agricoles, entrepôts logistiques — connaît un essor remarquable en Afrique centrale. Plusieurs projets pilotes sont en cours à Douala et Yaoundé, permettant à des investisseurs particuliers de detenir des fractions numériques d\'actifs physiques à partir de 10 000 FCFA. Le réseau Polygon, avec ses frais de transaction réduits et sa compatibilité avec les standards ERC-1400, s\'impose comme l\'infrastructure de choix.',
    imageUrl: '/tokenisation.jpeg',
    categorie: 'Blockchain',
    tempsLecture: 7,
  },
  {
    id: '6',
    titre: 'Investissement fractionné : BVMAC et partenaires fintech lancent un programme pilote',
    source: 'BVMAC',
    date: '18 avril 2026',
    resume: 'La bourse régionale s\'associe à des acteurs fintech pour démocratiser l\'accès aux titres BVMAC via des fractions accessibles dès 5 000 FCFA.',
    contenu: 'Dans le cadre de sa stratégie de démocratisation de l\'investissement, la BVMAC a officiellement lancé un programme pilote permettant aux particuliers d\'investir dans des fractions de titres cotés. Ce programme, développé en partenariat avec plusieurs plateformes fintech agréées COSUMAF, permet d\'acquérir des fractions d\'actions de sociétés comme SEMC, SAFACAM ou SOCAPALM à partir de 5 000 FCFA.',
    imageUrl: '/fractions de titres.jpeg',
    categorie: 'Investissement',
    tempsLecture: 4,
  },
];
