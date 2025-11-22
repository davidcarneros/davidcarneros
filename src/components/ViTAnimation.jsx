import React, { useState, useEffect } from 'react';
import { ArrowRight, Brain, Layers, Grid, Zap, Activity } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const ViTAnimation = () => {
    const [step, setStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const steps = [
        {
            title: "1. Patch Partitioning",
            description: "The input image is split into fixed-size patches.",
            formula: "x \\in \\mathbb{R}^{H \\times W \\times C} \\rightarrow x_p \\in \\mathbb{R}^{N \\times (P^2 \\cdot C)}",
            icon: <Grid className="w-6 h-6 text-primary-400" />
        },
        {
            title: "2. Linear Projection & Embedding",
            description: "Patches are flattened and mapped to D dimensions. Position embeddings are added.",
            formula: "z_0 = [x_{class}; x_p^1 E; \\dots; x_p^N E] + E_{pos}",
            icon: <Layers className="w-6 h-6 text-purple-400" />
        },
        {
            title: "3. Transformer Encoder",
            description: "Multi-Head Self-Attention (MSA) and MLP blocks process the sequence.",
            formula: "z'_l = MSA(LN(z_{l-1})) + z_{l-1}",
            icon: <Activity className="w-6 h-6 text-emerald-400" />
        },
        {
            title: "4. MLP Head & Classification",
            description: "The class token is processed to predict the final class.",
            formula: "y = LN(z_L^0)",
            icon: <Brain className="w-6 h-6 text-amber-400" />
        }
    ];

    return (
        <div className="w-full bg-dark-surface/50 rounded-2xl border border-dark-border overflow-hidden backdrop-blur-sm">
            {/* Header / Controls */}
            <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-bg/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-500/10 rounded-lg">
                        <Brain className="w-5 h-5 text-primary-400" />
                    </div>
                    <span className="font-mono text-sm text-primary-400">ViT Architecture Visualization</span>
                </div>
                <div className="flex gap-2">
                    {steps.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setStep(idx); setIsPaused(true); }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${step === idx ? 'bg-primary-500 scale-125' : 'bg-dark-border hover:bg-gray-600'
                                }`}
                        />
                    ))}
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="ml-4 text-xs text-gray-500 hover:text-white transition-colors"
                    >
                        {isPaused ? '▶ Play' : '⏸ Pause'}
                    </button>
                </div>
            </div>

            {/* Main Visualization Area */}
            <div className="relative h-96 p-8 flex items-center justify-center bg-grid-pattern">

                {/* Stage 1: Image to Patches */}
                <div className={`absolute transition-all duration-700 transform ${step === 0 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 -translate-x-20 pointer-events-none'
                    }`}>
                    <div className="relative group">
                        <div className="w-48 h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg border border-gray-600 overflow-hidden grid grid-cols-3 gap-0.5 p-0.5 shadow-2xl">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 hover:bg-primary-500/40 transition-colors duration-300 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white/20 font-mono">
                                        P{i + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center w-full">
                            <div className="text-sm font-mono text-gray-400">Input Image</div>
                            <div className="text-xs text-gray-600">224x224x3</div>
                        </div>
                    </div>
                </div>

                {/* Stage 2: Linear Projection */}
                <div className={`absolute transition-all duration-700 transform w-full flex justify-center ${step === 1 ? 'opacity-100 scale-100 translate-x-0' : step < 1 ? 'opacity-0 scale-90 translate-x-20 pointer-events-none' : 'opacity-0 scale-90 -translate-x-20 pointer-events-none'
                    }`}>
                    <div className="flex gap-2 items-end">
                        {/* Class Token */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-32 bg-purple-500/20 border border-purple-500/50 rounded-md relative overflow-hidden animate-pulse">
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
                                <div className="absolute bottom-0 w-full h-1 bg-purple-500"></div>
                            </div>
                            <span className="text-xs text-purple-400 font-mono">CLS</span>
                        </div>
                        {/* Patch Embeddings */}
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2" style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="w-8 h-32 bg-primary-500/10 border border-primary-500/30 rounded-md relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                                    <div className="absolute inset-0 flex flex-col justify-between p-1">
                                        {[...Array(8)].map((_, j) => (
                                            <div key={j} className="w-full h-0.5 bg-primary-500/20 rounded-full"></div>
                                        ))}
                                    </div>
                                    {/* Positional Encoding Indicator */}
                                    <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-emerald-500/30 to-transparent flex items-center justify-center">
                                        <span className="text-[8px] text-emerald-300">+Pos</span>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-mono">P{i + 1}</span>
                            </div>
                        ))}
                        <div className="text-gray-600 text-xl self-center">...</div>
                    </div>
                </div>

                {/* Stage 3: Transformer Encoder */}
                <div className={`absolute transition-all duration-700 transform w-full flex flex-col items-center justify-center ${step === 2 ? 'opacity-100 scale-100 translate-x-0' : step < 2 ? 'opacity-0 scale-90 translate-x-20 pointer-events-none' : 'opacity-0 scale-90 -translate-x-20 pointer-events-none'
                    }`}>
                    <div className="relative w-64 h-64">
                        {/* Layers */}
                        {[...Array(3)].map((_, i) => (
                            <div key={i}
                                className="absolute inset-0 border border-emerald-500/30 bg-dark-bg/80 backdrop-blur-sm rounded-xl shadow-xl flex flex-col items-center justify-center gap-4 transition-all duration-500"
                                style={{
                                    transform: `translateY(${i * -10}px) scale(${1 - i * 0.05})`,
                                    zIndex: 3 - i,
                                    opacity: 1 - i * 0.2
                                }}
                            >
                                <div className="w-48 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded flex items-center justify-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-400" />
                                    <span className="text-xs text-emerald-200 font-mono">Multi-Head Attn</span>
                                </div>
                                <div className="w-48 h-12 bg-blue-500/10 border border-blue-500/30 rounded flex items-center justify-center gap-2">
                                    <Zap className="w-4 h-4 text-blue-400" />
                                    <span className="text-xs text-blue-200 font-mono">MLP Block</span>
                                </div>
                                {i === 0 && (
                                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                        <div className="w-8 h-0.5 bg-emerald-500/50"></div>
                                        <div className="text-[10px] text-emerald-500 font-mono rotate-90 origin-left translate-y-4">Nx Layers</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stage 4: Classification */}
                <div className={`absolute transition-all duration-700 transform w-full flex flex-col items-center justify-center ${step === 3 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-20 pointer-events-none'
                    }`}>
                    <div className="flex items-center gap-8">
                        {/* Final Representation */}
                        <div className="w-12 h-40 bg-purple-500/20 border border-purple-500/50 rounded-md relative overflow-hidden animate-pulse">
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent"></div>
                            <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-purple-300 font-mono">z_L</div>
                        </div>

                        <ArrowRight className="w-6 h-6 text-gray-600" />

                        {/* MLP Head */}
                        <div className="w-32 h-24 bg-amber-500/10 border border-amber-500/30 rounded-lg flex flex-col items-center justify-center gap-2">
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-amber-500/50 animate-bounce" style={{ animationDelay: `${i * 100}ms` }}></div>
                                ))}
                            </div>
                            <span className="text-xs text-amber-200 font-mono">MLP Head</span>
                        </div>

                        <ArrowRight className="w-6 h-6 text-gray-600" />

                        {/* Prediction */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Prediction</div>
                            <div className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                "Cat"
                            </div>
                            <div className="text-xs text-emerald-400 mt-1 font-mono">Confidence: 98.2%</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Info Panel */}
            <div className="bg-dark-bg/80 border-t border-dark-border p-6 backdrop-blur-md transition-colors duration-500">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-dark-surface rounded-xl border border-dark-border shadow-lg">
                        {steps[step].icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                            {steps[step].title}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-normal">Step {step + 1}/4</span>
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 leading-relaxed">{steps[step].description}</p>
                        <div className="bg-black/30 rounded-lg p-3 border border-white/5 font-mono text-sm text-primary-300 overflow-x-auto">
                            <InlineMath math={steps[step].formula} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViTAnimation;
