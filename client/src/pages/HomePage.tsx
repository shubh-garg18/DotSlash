import illustration from "@/assets/illustration.svg"
import FormComponent from "@/components/forms/FormComponent"
import Footer from "@/components/common/Footer"

function HomePage() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-gray-300 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }} />
            </div>

            {/* Terminal-style header */}
            <div className="relative z-10 border-b border-gray-800 bg-[#161b22] px-4 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                        </div>
                        <span className="text-sm font-mono text-gray-400">~/dotslash</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-gray-500">
                        <span>v1.0.0</span>
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        <span>online</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 min-h-[calc(100vh-140px)]">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left side - Illustration */}
                    <div className="flex flex-col items-center order-2 lg:order-1">
                        <div className="relative group">
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500"></div>
                            
                            <img
                                src={illustration}
                                alt="Dot Slash Illustration"
                                className="relative z-10 w-80 sm:w-96 lg:w-[420px] opacity-90 hover:opacity-100 transition-all duration-500 animate-float filter drop-shadow-2xl"
                            />
                        </div>
                        
                        {/* Feature highlights */}
                        <div className="mt-8 space-y-3">
                            <div className="flex items-center gap-3 px-4 py-2 bg-[#161b22]/50 border border-gray-700/50 rounded-lg backdrop-blur-sm hover:border-gray-600/50 transition-all duration-200">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-sm font-mono text-gray-300">Real-time collaboration</span>
                            </div>
                            
                            <div className="flex items-center gap-3 px-4 py-2 bg-[#161b22]/50 border border-gray-700/50 rounded-lg backdrop-blur-sm hover:border-gray-600/50 transition-all duration-200">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                <span className="text-sm font-mono text-gray-300">Instant room creation</span>
                            </div>
                            
                            <div className="flex items-center gap-3 px-4 py-2 bg-[#161b22]/50 border border-gray-700/50 rounded-lg backdrop-blur-sm hover:border-gray-600/50 transition-all duration-200">
                                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                <span className="text-sm font-mono text-gray-300">Cross-platform sync</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="flex justify-center order-1 lg:order-2">
                        <FormComponent />
                    </div>
                </div>
            </div>

            <Footer />

            {/* Enhanced floating animation */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                    }
                    25% { 
                        transform: translateY(-12px) rotate(0.5deg); 
                    }
                    50% { 
                        transform: translateY(-20px) rotate(0deg); 
                    }
                    75% { 
                        transform: translateY(-8px) rotate(-0.5deg); 
                    }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default HomePage