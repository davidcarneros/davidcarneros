import React, { useState, useRef, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import TabNavigation from './TabNavigation';
import ResearchSection from './ResearchSection';
import PublicationsSection from './PublicationsSection';
import TeachingSection from './TeachingSection';
import ConnectSection from './ConnectSection';
import MetricsSection from './MetricsSection';
// import foto from assests/foto.jpg

import { academicData } from '../data/academicData';

const AcademicProfile = () => {
    const [activeTab, setActiveTab] = useState('research');
    
    // Refs for elements to animate
    const headerRef = useRef(null);
    const tabsRef = useRef(null);
    const contentRef = useRef(null);
    const statsRef = useRef(null);

    // Animation for when elements come into view
    const fadeInElement = (element) => {
        if (element) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
            
            return () => {
                if (element) observer.unobserve(element);
            };
        }
    };

    useEffect(() => {
        // Animate elements when they come into view
        fadeInElement(headerRef.current);
        fadeInElement(tabsRef.current);
        fadeInElement(contentRef.current);
        fadeInElement(statsRef.current);
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-900">
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
                .card-hover {
                    transition: all 0.3s ease;
                }
                .card-hover:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
                }
                `}
            </style>
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div ref={headerRef} className="opacity-0" style={{ transitionDelay: '0.1s' }}>
                    <ProfileHeader />
                </div>

                {/* Navigation Tabs */}
                <div ref={tabsRef} className="opacity-0" style={{ transitionDelay: '0.2s' }}>
                    <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Content Sections */}
                <div ref={contentRef} className="mb-8 opacity-0" style={{ transitionDelay: '0.3s' }}>
                    {activeTab === 'research' && <ResearchSection />}
                    {activeTab === 'publications' && <PublicationsSection />}
                    {activeTab === 'teaching' && <TeachingSection />}
                    {activeTab === 'connect' && <ConnectSection />}
                </div>

                {/* Stats Section */}
                <div ref={statsRef} className="opacity-0" style={{ transitionDelay: '0.4s' }}>
                    <MetricsSection />
                </div>
            </div>
        </div>
    );
};

export default AcademicProfile;