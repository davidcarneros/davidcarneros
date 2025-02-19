import React, { useState } from 'react';
import { Brain, Database, Code, Zap, Book, Presentation, GraduationCap, Users, FileCheck } from 'lucide-react';
import foto from '../assets/foto.jpeg';

const AcademicProfile = () => {
    const [activeTab, setActiveTab] = useState('research');

    const researchAreas = [
        { icon: <Brain className="w-6 h-6 text-blue-500" />, name: "Machine Learning & AI" },
        { icon: <Database className="w-6 h-6 text-blue-500" />, name: "Synthetic Data" },
        { icon: <Code className="w-6 h-6 text-blue-500" />, name: "Human Movement Analysis" },
        { icon: <Zap className="w-6 h-6 text-blue-500" />, name: "Gait Analysis" }
    ];

    const publications = [
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
    ];

    const conferences = [
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
    ];

    const teaching = {
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
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <img
                        src={foto}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
                    />
                    <h1 className="text-4xl font-bold mb-2 text-blue-600">
                        David Carneros-Prado
                    </h1>
                    <p className="text-xl text-gray-600">
                        Predoctoral Researcher in Advanced Computing Technologies
                    </p>
                    <p className="text-md text-gray-500 mt-2">
                        University of Castilla-La Mancha (UCLM)
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mb-8 gap-4">
                    {['research', 'publications', 'teaching', 'connect'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="mb-8">
                    {activeTab === 'research' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Research Areas</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {researchAreas.map((area, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3 hover:shadow-md transition-shadow">
                                        {area.icon}
                                        <span className="text-gray-700 font-medium">{area.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'publications' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                    <Book className="w-6 h-6" />
                                    Journal Articles
                                </h2>
                                <div className="space-y-4">
                                    {publications.filter(pub => pub.type === 'journal').map((pub, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                            <h3 className="font-medium text-gray-900">{pub.title}</h3>
                                            <p className="text-sm text-gray-600 mt-2">{pub.authors}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-sm font-medium text-blue-600">{pub.journal}</span>
                                                <span className="text-sm text-gray-500">({pub.year})</span>
                                                <span className="text-sm font-medium text-green-600">{pub.quartile}</span>
                                                <span className="text-sm text-gray-500">{pub.publisher}</span>
                                            </div>
                                            {pub.doi && (
                                                <a
                                                    href={`https://doi.org/${pub.doi}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-500 hover:text-blue-600 mt-2 inline-block"
                                                >
                                                    DOI: {pub.doi}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                    <Presentation className="w-6 h-6" />
                                    Conference Papers
                                </h2>
                                <div className="space-y-4">
                                    {conferences.map((conf, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                            <h3 className="font-medium text-gray-900">{conf.title}</h3>
                                            <p className="text-sm text-gray-600 mt-2">{conf.authors}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-sm font-medium text-blue-600">{conf.conference}</span>
                                                <span className="text-sm text-gray-500">({conf.year})</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {conf.location} • Pages: {conf.pages} • {conf.publisher}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'teaching' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                    <GraduationCap className="w-6 h-6" />
                                    Teaching Experience
                                </h2>
                                <div className="space-y-4">
                                    {teaching.courses.map((course, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                            <h3 className="font-medium text-gray-900">{course.course}</h3>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-sm text-gray-600">{course.institution}</p>
                                                <p className="text-sm text-gray-600">{course.period} • {course.credits} ECTS</p>
                                                <p className="text-sm text-gray-500">{course.type} course • {course.level}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                    <FileCheck className="w-6 h-6" />
                                    Thesis Supervision
                                </h2>
                                <div className="space-y-4">
                                    {teaching.supervision.map((thesis, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                            <h3 className="font-medium text-gray-900">{thesis.title}</h3>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-sm text-gray-600">Student: {thesis.student}</p>
                                                <p className="text-sm text-gray-600">{thesis.type} • Grade: {thesis.grade}</p>
                                                <p className="text-sm text-gray-500">{thesis.institution} - {thesis.campus} • {thesis.year}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'connect' && (
                        <div className="flex flex-col items-center gap-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Users className="w-6 h-6" />
                                Connect with me
                            </h2>
                            <div className="flex gap-6">
                                <a href="https://github.com/dcarneros" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                </a>
                                <a href="mailto:davidcarneros4598@gmail.com" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <h3 className="text-xl font-bold text-blue-600">10+</h3>
                        <p className="text-sm text-gray-600">Publications</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                        <h3 className="text-xl font-bold text-purple-600">5+</h3>
                        <p className="text-sm text-gray-600">Years Research</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                        <h3 className="text-xl font-bold text-green-600">4+</h3>
                        <p className="text-sm text-gray-600">Active Projects</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicProfile;