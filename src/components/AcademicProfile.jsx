import React, { useState, useRef, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import TabNavigation from './TabNavigation';
import ResearchSection from './ResearchSection';
import PublicationsSection from './PublicationsSection';
import TeachingSection from './TeachingSection';
import ConnectSection from './ConnectSection';
import MetricsSection from './MetricsSection';
import ParticleBackground from './ParticleBackground';
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
        <div className="min-h-screen bg-dark-bg text-gray-100 relative overflow-hidden font-sans selection:bg-primary-500 selection:text-white">
            <ParticleBackground />

            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in {
                    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .glass-panel {
                    background: rgba(30, 41, 59, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                `}
            </style>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div ref={headerRef} className="opacity-0 mb-12" style={{ transitionDelay: '0.1s' }}>
                    <ProfileHeader />
                </div>

                {/* Stats Section - Moved up for better visibility */}
                <div ref={statsRef} className="opacity-0 mb-12" style={{ transitionDelay: '0.2s' }}>
                    <MetricsSection />
                </div>

                {/* Navigation Tabs */}
                <div ref={tabsRef} className="opacity-0 mb-8 sticky top-4 z-50" style={{ transitionDelay: '0.3s' }}>
                    <div className="glass-panel rounded-2xl p-2 shadow-2xl shadow-black/20">
                        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>

                {/* Content Sections */}
                <div ref={contentRef} className="opacity-0 min-h-[600px]" style={{ transitionDelay: '0.4s' }}>
                    <div className="glass-panel rounded-3xl p-8 shadow-2xl shadow-black/20">
                        {activeTab === 'research' && <ResearchSection />}
                        {activeTab === 'publications' && <PublicationsSection />}
                        {activeTab === 'teaching' && <TeachingSection />}
                        {activeTab === 'connect' && <ConnectSection />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicProfile;