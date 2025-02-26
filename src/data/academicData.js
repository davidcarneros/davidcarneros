import { 
  Brain, Database, Code, Zap, Atom, Cpu
} from 'lucide-react';
import React from 'react';

// Define the research area icons as a function that returns a component
// This way we avoid direct JSX usage in the data structure
const createResearchAreas = () => [
  { 
    iconName: 'Brain', 
    createIcon: () => React.createElement(Brain, { className: "w-6 h-6 text-blue-500" }),
    name: "Machine Learning & AI" 
  },
  { 
    iconName: 'Database', 
    createIcon: () => React.createElement(Database, { className: "w-6 h-6 text-blue-500" }),
    name: "Synthetic Data" 
  },
  { 
    iconName: 'Code', 
    createIcon: () => React.createElement(Code, { className: "w-6 h-6 text-blue-500" }),
    name: "Human Movement Analysis" 
  },
  { 
    iconName: 'Zap', 
    createIcon: () => React.createElement(Zap, { className: "w-6 h-6 text-blue-500" }),
    name: "Gait Analysis" 
  },
  { 
    iconName: 'Atom', 
    createIcon: () => React.createElement(Atom, { className: "w-6 h-6 text-blue-500" }),
    name: "Quantum Computing" 
  },
  { 
    iconName: 'Cpu', 
    createIcon: () => React.createElement(Cpu, { className: "w-6 h-6 text-blue-500" }),
    name: "CUDA & GPU Computing" 
  }
];

export const academicData = {
  // Generate research areas dynamically when needed
  get researchAreas() {
    return createResearchAreas();
  },

  publications: [
    {
      type: "journal",
      title: "Automation of observational gait assessment through an optical 3D motion system and transformers",
      authors: "Carneros-Prado, D., González Velázquez, S., Dobrescu, C.C., González Díaz, I., Fontecha Diezma, J., Hervás Lucas, R.",
      journal: "Applied Intelligence",
      year: 2024,
      doi: "10.1007/s10489-024-06163-w",
      quartile: "Q2",
      publisher: "Springer Nature"
    },
    {
      type: "journal",
      title: "A comparison between Multilayer Perceptrons and Kolmogorov-Arnold Networks for multi-task classification in sitting posture recognition",
      authors: "Carneros-Prado, D., Cabañero Gómez, L., Johnson Ruiz, E., González Díaz, I., Fontecha Diezma, J., Hervás Lucas, R.",
      journal: "IEEE Access",
      year: 2024,
      doi: "10.1109/ACCESS.2024.3510034",
      quartile: "Q2",
      publisher: "IEEE"
    },
    {
      type: "journal",
      title: "Synthetic 3D full-body skeletal motion from 2D paths using RNN with LSTM cells and linear networks",
      authors: "Carneros-Prado, D., Dobrescu, C.C., Cabañero Gómez, L., Villa Fernández-Arroyo, L., Altamirano Flores, Y.V., Lopez Nava, I.H., González Díaz, I., Fontecha Diezma, J., Hervás Lucas, R.",
      journal: "Computers in Biology and Medicine",
      year: 2024,
      doi: "10.1016/j.compbiomed.2024.108943",
      quartile: "Q1",
      publisher: "Elsevier"
    },
    {
      type: "journal",
      title: "Direct Memory Access-Based Data Storage for Long-Term Acquisition Using Wearables in an Energy-Efficient Manner",
      authors: "Dobrescu, C.C., González Díaz, I., Carneros-Prado, D., Fontecha Diezma, J., Nugent, C.",
      journal: "Sensors",
      year: 2024,
      doi: "10.3390/s24154982",
      quartile: "Q2",
      publisher: "MDPI"
    },
    {
      type: "journal",
      title: "Comparative Analysis of Generic and Fine-Tuned Large Language Models for Conversational Agent Systems",
      authors: "Villa Fernández-Arroyo, L., Carneros-Prado, D., Dobrescu, C.C., Sánchez-Miguel Ortega, A., Cubero Charco, G., Hervás Lucas, R.",
      journal: "Robotics",
      year: 2024,
      doi: "10.3390/robotics13050068",
      quartile: "Q2",
      publisher: "MDPI"
    },
    {
      type: "journal",
      title: "Analysis of Dual-Tasking Effect on Gait Variability While Interacting with Mobile Devices",
      authors: "Carneros-Prado, D., Dobrescu, C.C., González, I., Fontecha, J., Johnson, E., Hervás, R.",
      journal: "Mathematics",
      year: 2022,
      doi: "10.3390/math11010202",
      quartile: "Q1",
      publisher: "MDPI"
    },
    {
      type: "journal",
      title: "PhyRe up! a system based on mixed reality and gamification to provide home rehabilitation for stroke patients",
      authors: "Gomez-Portes, C., Carneros-Prado, D., Albusac, J., Castro-Schez, J.J., Glez-Morcillo, C., Vallejo, D.",
      journal: "IEEE Access",
      year: 2021,
      doi: "10.1109/ACCESS.2021.3118842",
      quartile: "Q2",
      publisher: "IEEE"
    }
  ],

  conferences: [
    {
      title: "A Preliminary Study on Empathy in Conversational Social Agents",
      authors: "Johnson, E., Villa, L., Carneros-Prado, D., Garcia-Martinez, B., Mondejar, T., Hervás, R.",
      conference: "International Conference on Ubiquitous Computing and Ambient Intelligence",
      location: "Belfast, Northern Ireland",
      year: 2024,
      publisher: "Springer, Cham",
      pages: "129-138"
    },
    {
      title: "Viric Learning-A Novel Transfer Learning Method",
      authors: "Barragán, A., Fontecha, J., González, I., Jonhson, E., Carneros-Prado, D., Villa, L.",
      conference: "International Conference on Ubiquitous Computing and Ambient Intelligence",
      location: "Riviera Maya, México",
      year: 2023,
      publisher: "Springer Nature Switzerland",
      pages: "285-291"
    },
    {
      title: "Comparative Study of Large Language Models as Emotion and Sentiment Analysis Systems: A Case-Specific Analysis of GPT vs. IBM Watson",
      authors: "Carneros-Prado, D., Villa Fernández-Arroyo, L., Johnson Ruiz, M.E., Dobrescu, C.C., Barragán Carmona, A., García Martínez, B.",
      conference: "15th International Conference on Ubiquitous Computing and Ambient Intelligence (UCAmI 2023)",
      location: "Riviera Maya, México",
      year: 2023,
      publisher: "Springer",
      pages: "229-239"
    },
    {
      title: "Conversational Agent Development Through Large Language Models: Approach with GPT",
      authors: "Villa Fernandez-Arroyo, L., Carneros-Prado, D., Sánchez-Miguel Ortega, A., Dobrescu, C.C., Hervás Lucas, R.",
      conference: "15th International Conference on Ubiquitous Computing and Ambient Intelligence (UCAmI 2023)",
      location: "Riviera Maya, México",
      year: 2023,
      publisher: "Springer",
      pages: "286-297"
    },
    {
      title: "Approach to a Lower Body Gait Generation Model Using a Deep Convolutional Generative Adversarial Network",
      authors: "Carneros-Prado, D., Dobrescu, C.C., Cabañero Gomez, L., Altamirano-Flores, Y.V., López-Nava, I.H., González Díaz, I., Fontecha Diezma, J., Hervás Lucas, R.",
      conference: "14th International Conference on Ubiquitous Computing and Ambient Intelligence (UCAmI 2022)",
      location: "Córdoba, Spain",
      year: 2022,
      publisher: "Springer",
      pages: "419-430"
    },
    {
      title: "Emotion Recognition from Human Gait Using Machine Learning Algorithms",
      authors: "Altamirano-Flores, Y.V., Lopez-Nava, I.H., González, I., Dobrescu, C.C., Carneros-Prado, D.",
      conference: "Proceedings of the International Conference on Ubiquitous Computing & Ambient Intelligence (UCAmI 2022)",
      location: "Córdoba, Spain",
      year: 2022,
      publisher: "Springer Nature",
      pages: "77"
    }
  ],

  teaching: {
    courses: [
      {
        course: "Intelligent Systems",
        level: "Undergraduate",
        institution: "University of Castilla-La Mancha",
        period: "2024-2025",
        type: "Mandatory",
        credits: 6
      },
      {
        course: "Intelligent Systems",
        level: "Undergraduate",
        institution: "University of Castilla-La Mancha",
        period: "2023-2024",
        type: "Mandatory",
        credits: 6
      },
      {
        course: "Intelligent Systems",
        level: "Undergraduate",
        institution: "University of Castilla-La Mancha",
        period: "2022-2023",
        type: "Mandatory",
        credits: 6
      }
    ],
    supervision: [
      {
        title: "Development of a Digital Twin for Health Wearables with Focus on Energy Efficiency and Embedded Classifiers",
        student: "Daniel Durán Fernández",
        type: "Bachelor's Thesis",
        grade: "10/10",
        institution: "University of Castilla-La Mancha",
        year: "2024",
        campus: "Talavera de la Reina"
      }
    ]
  },

  metrics: {
    publications: 13, // Journals + conferences
    researchYears: 5,
    hIndex: 4,
    citations: 53,
    projects: ["Just move!", "SHARA3", "SSITH", "TAICare"]
  }
};