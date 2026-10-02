(() => {
/* Personal content. Add photos from your own trips by replacing a place's image path. */
const PHOTO_CREDITS = {
  singapore: [
    "Singapore Marina Bay Dusk 2018-02-27.jpg",
    "Benh LIEU SONG",
    "CC BY-SA 4.0",
  ],
  hanoi: [
    "Hanoi, Vietnam, Hoan Kiem Lake.jpg",
    "Vyacheslav Argenberg",
    "CC BY 4.0",
  ],
  sicily: [
    "Taormina BW 2025-04-27 12-35-55.jpg",
    "Berthold Werner",
    "CC BY-SA 4.0",
  ],
  rome: ["Colosseum in Rome, Italy - April 2007.jpg", "Diliff", "CC BY-SA 2.5"],
  pisa: [
    "Exterior of the Leaning Tower (Pisa) in April 2024.1.jpg",
    "PaestumPaestum",
    "CC BY 4.0",
  ],
  vatican: [
    "Peters Square Sunrise Vatican Rome Sep19 R16 01827.jpg",
    "Timothy A. Gonsalves",
    "CC BY-SA 4.0",
  ],
  milan: ["20110724 Milan Cathedral 5260.jpg", "Jakub Hałun", "CC BY-SA 4.0"],
  munich: ["Munich skyline.jpg", "Stefan Kühn", "CC BY-SA 3.0"],
  madrid: ["Gran Via, Madrid, to south.jpg", "Gerda Arendt", "CC0"],
  frankfurt: [
    "Frankfurt Skyline 2022 bei Nacht.jpg",
    "Jörg Braukmann",
    "CC BY-SA 4.0",
  ],
  paris: [
    "Paris - The Eiffel Tower in spring - 2307.jpg",
    "Jorge Royan",
    "CC BY-SA 3.0",
  ],
  "hong-kong": [
    "Hong Kong Harbour Night 2019-06-11.jpg",
    "Benh LIEU SONG",
    "CC BY-SA 4.0",
  ],
  "south-korea": [
    "Hyangwonjeong Pavilion and Chwihyanggyo Bridge at Gyeongbokgung Palace with blue sky in Seoul.jpg",
    "Basile Morin",
    "CC BY-SA 4.0",
  ],
  thessaloniki: [
    "The White Tower of Thessaloniki Greece.jpg",
    "Salwa Farwaneh Dameh",
    "CC0",
  ],
  athens: [
    "20101024 Acropolis panoramic view from Areopagus hill Athens Greece.jpg",
    "Ggia",
    "CC BY-SA 3.0",
  ],
  malaysia: [
    "City Landscape, Kuala Lumpur - Malaysia.jpg",
    "Khalzuri Yazid",
    "CC BY-SA 2.0",
  ],
};

function withPhoto(place) {
  const [filename, photographer, license] = PHOTO_CREDITS[place.id];
  return {
    ...place,
    image: `./assets/img/places/${place.id}.jpg`,
    photoUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename).replace(/%20/g, "_")}`,
    photographer,
    license,
  };
}

const PLACES = [
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    coordinates: [103.82, 1.35],
    year: "2020–present",
    sortYear: 2026,
    kind: "STUDY · RESEARCH · WORK",
    description:
      "Computer Science and PhD research at NTU, with research internships at TikTok and A*STAR in Singapore.",
    tags: ["#NTU", "#Research", "#TikTok", "#A*STAR"],
  },
  {
    id: "athens",
    name: "Athens",
    country: "Greece",
    coordinates: [23.7275, 37.9838],
    year: "2026",
    sortYear: 2026,
    kind: "TRAVEL NOTE",
    description: "Athens, Greece · visited in 2026.",
    tags: ["#Greece", "#Travel"],
  },
  {
    id: "thessaloniki",
    name: "Thessaloniki",
    country: "Greece",
    coordinates: [22.9444, 40.6401],
    year: "2026",
    sortYear: 2026,
    kind: "TRAVEL NOTE",
    description: "Thessaloniki, Greece · visited in 2026.",
    tags: ["#Greece", "#Travel"],
  },
  {
    id: "sicily",
    name: "Sicily",
    country: "Italy",
    coordinates: [14.01, 37.6],
    year: "2025",
    sortYear: 2025,
    kind: "TRAVEL NOTE",
    description:
      "Visited Sicily in 2025. ACM SAC 2025 took place in Catania, Sicily, where our Curriculum Demonstration Selection paper appeared.",
    tags: ["#Italy", "#Travel", "#SAC2025"],
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    coordinates: [12.4964, 41.9028],
    year: "2025",
    sortYear: 2025,
    kind: "TRAVEL NOTE",
    description: "Rome, Italy · visited in 2025.",
    tags: ["#Italy", "#Travel"],
  },
  {
    id: "pisa",
    name: "Pisa",
    country: "Italy",
    coordinates: [10.4017, 43.7228],
    year: "2025",
    sortYear: 2025,
    kind: "TRAVEL NOTE",
    description: "Pisa, Italy · visited in 2025.",
    tags: ["#Italy", "#Travel"],
  },
  {
    id: "vatican",
    name: "Vatican City",
    country: "Vatican City",
    coordinates: [12.4534, 41.9029],
    year: "2025",
    sortYear: 2025,
    kind: "TRAVEL NOTE",
    description: "Vatican City · visited in 2025.",
    tags: ["#Vatican", "#Travel"],
  },
  {
    id: "milan",
    name: "Milan",
    country: "Italy",
    coordinates: [9.19, 45.4642],
    year: "2025",
    sortYear: 2025,
    kind: "TRAVEL NOTE",
    description: "Milan, Italy · visited in 2025.",
    tags: ["#Italy", "#Travel"],
  },
  {
    id: "munich",
    name: "Munich",
    country: "Germany",
    coordinates: [11.582, 48.1351],
    year: "2025",
    sortYear: 2025,
    kind: "TRAVEL NOTE",
    description: "Munich, Germany · visited in 2025.",
    tags: ["#Germany", "#Travel"],
  },
  {
    id: "madrid",
    name: "Madrid",
    country: "Spain",
    coordinates: [-3.7038, 40.4168],
    year: "2024",
    sortYear: 2024,
    kind: "TRAVEL NOTE",
    description: "Madrid, Spain · visited in 2024.",
    tags: ["#Spain", "#Travel"],
  },
  {
    id: "frankfurt",
    name: "Frankfurt",
    country: "Germany",
    coordinates: [8.6821, 50.1109],
    year: "2024",
    sortYear: 2024,
    kind: "TRAVEL NOTE",
    description: "Frankfurt, Germany · visited in 2024.",
    tags: ["#Germany", "#Travel"],
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    coordinates: [2.3522, 48.8566],
    year: "2024",
    sortYear: 2024,
    kind: "TRAVEL NOTE",
    description: "Paris, France · visited in 2024.",
    tags: ["#France", "#Travel"],
  },
  {
    id: "malaysia",
    name: "Malaysia",
    country: "Malaysia",
    coordinates: [102.25, 4.21],
    year: "2024",
    sortYear: 2024,
    kind: "TRAVEL NOTE",
    description:
      "Malaysia · visited in 2024. The map pin marks the country, as a city was not specified.",
    tags: ["#Malaysia", "#Travel"],
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    coordinates: [105.85, 21.03],
    year: "2017 / 2021",
    sortYear: 2021,
    kind: "SCHOOL · RESEARCH",
    description:
      "I started high school at HSGS in Hanoi in 2017. In 2021, I worked here as a Computer Vision Research Intern at Viettel.",
    tags: ["#HSGS", "#Viettel", "#Hanoi"],
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    country: "Hong Kong",
    coordinates: [114.1694, 22.3193],
    year: "2019",
    sortYear: 2019,
    kind: "TRAVEL NOTE",
    description: "Hong Kong · visited in 2019.",
    tags: ["#HongKong", "#Travel"],
  },
  {
    id: "south-korea",
    name: "South Korea",
    country: "South Korea",
    coordinates: [127.8, 36.35],
    year: "2016",
    sortYear: 2016,
    kind: "TRAVEL NOTE",
    description:
      "South Korea · visited in 2016. The map pin marks the country, as a city was not specified.",
    tags: ["#SouthKorea", "#Travel"],
  },
].map(withPhoto);

/* One entry per distinct work: acceptance announcements do not appear separately. */
const PAPERS = [
  {
    id: "self-correction",
    year: 2026,
    venue: "Findings of EMNLP 2026",
    title:
      "Reinforcing Step-level Reasoning for Effective Self-Correction in LLMs",
    authors:
      "Vu Duc Anh, Nhat M. Hoang, Do Xuan Long, Cong-Duy Nguyen, Ponhvoan Srey, and Luu Anh Tuan",
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2608.11573" }],
  },
  {
    id: "signals-transfer",
    year: 2026,
    venue: "arXiv preprint",
    title:
      "From Signals to Transfer: A Factorised Study of Probe-Based Uncertainty Estimation in Large Language Models",
    authors:
      "Ponhvoan Srey, Xiaobao Wu, Cong-Duy Nguyen, Quang Minh Nguyen, Duc Anh Vu, and Anh Tuan Luu",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2606.27679" },
      { label: "Code", url: "https://github.com/ponhvoan/ProbeUE" },
    ],
  },
  {
    id: "biasprompting",
    year: 2026,
    venue: "ACM SAC 2026",
    title:
      "More Bias, Less Bias: BiasPrompting for Enhanced Multiple-Choice Question Answering",
    authors:
      "Duc Anh Vu, Thong Nguyen, Cong-Duy Nguyen, Viet Anh Nguyen, and Anh Tuan Luu",
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2511.20086" }],
  },
  {
    id: "cutpaste",
    year: 2025,
    venue: "arXiv preprint",
    title:
      "CutPaste&Find: Efficient Multimodal Hallucination Detector with Visual-aid Knowledge Base",
    authors:
      "Cong-Duy Nguyen, Xiaobao Wu, Duc Anh Vu, Shuai Zhao, Thong Nguyen, and Anh Tuan Luu",
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2502.12591" }],
  },
  {
    id: "curriculum",
    year: 2025,
    venue: "ACM SAC 2025",
    title: "Curriculum Demonstration Selection for In-Context Learning",
    authors:
      "Duc Anh Vu, Cong-Duy Nguyen, Xiaobao Wu, Nhat Hoang, Mingzhe Du, Thong Nguyen, and Anh Tuan Luu",
    links: [
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3672608.3707810" },
    ],
  },
  {
    id: "toxcl",
    year: 2024,
    venue: "NAACL 2024",
    title:
      "ToXCL: A Unified Framework for Toxic Speech Detection and Explanation",
    authors:
      "Nhat M. Hoang, Xuan Long Do, Duc Anh Do, Duc Anh Vu, and Anh Tuan Luu",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2403.16685" },
      { label: "Code", url: "https://github.com/NhatHoang2002/ToXCL" },
    ],
  },
  {
    id: "regression",
    year: 2024,
    venue: "arXiv preprint",
    title:
      "A Novel Approach in Solving Stochastic Generalized Linear Regression via Nonconvex Programming",
    authors:
      "Vu Duc Anh, Tran Anh Tuan, Tran Ngoc Thang, and Nguyen Thi Ngoc Anh",
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2401.08488" }],
  },
  {
    id: "math-questioner",
    year: 2024,
    venue: "ACM SAC 2024",
    title:
      "ChatGPT as a Math Questioner? Evaluating ChatGPT on Generating Pre-university Math Questions",
    authors: "Phuoc Pham, Anh Vu, Nhat Hoang, Xuan Long Do, and Anh Tuan Luu",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2312.01661" },
      {
        label: "Code",
        url: "https://github.com/dxlong2000/ChatGPT-as-a-Math-Questioner",
      },
    ],
  },
  {
    id: "multimodal-sentiment",
    year: 2023,
    venue: "Findings of EMNLP 2023",
    title:
      "Improving Multimodal Sentiment Analysis: Supervised Angular Margin-based Contrastive Learning for Enhanced Fusion Representation",
    authors:
      "Cong-Duy T. Nguyen, Thong Thanh Nguyen, Duc Anh Vu, and Anh Tuan Luu",
    links: [
      {
        label: "Paper",
        url: "https://aclanthology.org/2023.findings-emnlp.980/",
      },
    ],
  },
  {
    id: "building-footprint",
    year: 2023,
    venue: "iCAST 2023",
    title:
      "Building Footprint Extraction in Dense Areas using Super Resolution and Frame Field Learning",
    authors:
      "Vuong Nguyen, Trong-Anh Ho, Duc-Anh Vu, Nguyen Thi Ngoc Anh, and Tran Ngoc Thang",
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2309.01656" }],
  },
  {
    id: "water-level",
    year: 2023,
    venue: "ICISNA 2023",
    title:
      "Using Data Mining for a Multi Deep Neural Network with Adam to Predict Water Level: Xuan Quan Gate in Bac Hung Hai System",
    authors:
      "Minh Hai Nguyen, Le Minh Hoang, Nguyen Quang Dat, Duc Anh Vu, Quang Vang Pham, and Duong Xuan Bien",
    links: [{ label: "Proceedings", url: "https://icisna.org/publication" }],
  },
];

/* Each publication belongs to exactly one area in the knowledge map. */
const RESEARCH_AREAS = [
  {
    id: "foundations",
    period: "2023–24",
    title: "Multimodal Learning & Machine Learning",
    question: "Early work in multimodal representations and applied learning.",
    papers: [
      { id: "multimodal-sentiment", label: "Multimodal sentiment" },
      { id: "building-footprint", label: "Building footprints" },
      { id: "water-level", label: "Water-level prediction" },
      { id: "regression", label: "Stochastic regression" },
    ],
  },
  {
    id: "capability",
    period: "2024",
    title: "LLM Elicitation",
    question: "Exploring what language models can generate and explain.",
    papers: [
      { id: "math-questioner", label: "Math question generation" },
      { id: "toxcl", label: "ToXCL" },
    ],
  },
  {
    id: "elicitation",
    period: "2025–26",
    title: "Prompt Optimisation",
    question: "Selecting examples and prompts to draw out stronger reasoning.",
    papers: [
      { id: "curriculum", label: "Curriculum selection" },
      { id: "biasprompting", label: "BiasPrompting" },
    ],
  },
  {
    id: "reliability",
    period: "2025–26",
    title: "Reliable Reasoning",
    question: "Detecting hallucinations and uncertainty in model outputs.",
    papers: [
      { id: "cutpaste", label: "CutPaste&Find" },
      { id: "signals-transfer", label: "Uncertainty transfer" },
    ],
  },
  {
    id: "post-training",
    period: "2026",
    title: "Reasoning Post-Training",
    question: "Training models to verify and correct their own reasoning.",
    papers: [{ id: "self-correction", label: "Step-level self-correction" }],
  },
];

const MILESTONES = [
  {
    year: 2023,
    date: "Jun 2023",
    type: "Award",
    title: "Qualcomm–KAIST Innovation Awards",
    detail: "Winner, 2023.",
  },
  {
    year: 2023,
    date: "Jan 2023",
    type: "Career",
    title: "NLP Research Intern · A*STAR",
    detail: "Research internship in Singapore.",
  },
  {
    year: 2022,
    date: "May 2022",
    type: "Career",
    title: "NLP Research Intern · TikTok",
    detail: "Research internship in Singapore.",
  },
  {
    year: 2021,
    date: "May 2021",
    type: "Career",
    title: "Computer Vision Research Intern · Viettel",
    detail: "Research internship in Hanoi, Vietnam.",
  },
  {
    year: 2020,
    date: "Aug 2020",
    type: "Education",
    title: "Computer Science at NTU",
    detail:
      "Began undergraduate studies at Nanyang Technological University, Singapore.",
  },
  {
    year: 2019,
    date: "May 2019",
    type: "Award",
    title: "Singapore International Mathematics Challenge",
    detail: "Third prize.",
  },
  {
    year: 2018,
    date: "Nov 2018",
    type: "Award",
    title: "National University of Hanoi Mathematics Olympiad",
    detail: "Silver medal.",
  },
  {
    year: 2017,
    date: "2017",
    type: "Education",
    title: "High School for Gifted Students (HSGS)",
    detail: "Started high school in Hanoi, Vietnam.",
  },
];

window.PORTFOLIO_DATA = { PLACES, PAPERS, RESEARCH_AREAS, MILESTONES };
})();
