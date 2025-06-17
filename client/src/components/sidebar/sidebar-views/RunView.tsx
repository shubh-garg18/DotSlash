import { useRunCode } from "@/context/RunCodeContext"
import useResponsive from "@/hooks/useResponsive"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import { LuCopy, LuPlay, LuLoader2 } from "react-icons/lu"
import { PiCaretDownBold } from "react-icons/pi"

function RunView() {
    const { viewHeight } = useResponsive()
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
    } = useRunCode()

    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = JSON.parse(e.target.value)
        setSelectedLanguage(lang)
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output)
        toast.success("Output copied to clipboard")
    }

    return (
        <div
            className="flex flex-col items-center gap-4 p-6"
            style={{ height: viewHeight }}
        >
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-3xl pointer-events-none"></div>
            
            {/* Enhanced title section */}
            <div className="text-center space-y-2 relative z-10">
                <h1 className="text-3xl font-mono font-bold text-white">
                    <span className="text-blue-400">.</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-green-400">run</span>
                </h1>
                <p className="text-sm text-gray-400 font-mono">
                    <span className="text-green-500">// </span>
                    execute your code
                </p>
            </div>

            {/* Main content container with editor styling */}
            <div className="flex h-[85%] w-full max-w-4xl flex-col relative z-10">
                <div className="bg-[#161b22] border border-gray-700 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm h-full flex flex-col">
                    
                    {/* Editor header */}
                    <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-lg border border-gray-700">
                                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                    <span className="text-sm font-mono text-gray-300">executor.js</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                                <span className="text-xs font-mono text-gray-500">
                                    {isRunning ? 'executing' : 'ready'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-hidden">
                        
                        {/* Language selector with line number */}
                        <div className="flex group">
                            <div className="w-10 text-gray-600 text-sm font-mono text-right pr-4 pt-2 select-none group-hover:text-gray-500 transition-colors">
                                01
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm text-gray-400 font-mono">
                                    <span className="text-purple-400">const</span> language <span className="text-gray-500">=</span>
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-[#0d1117] border border-gray-600 hover:border-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-lg px-4 py-3 text-white font-mono text-sm transition-all duration-200 focus:outline-none appearance-none cursor-pointer"
                                        value={JSON.stringify(selectedLanguage)}
                                        onChange={handleLanguageChange}
                                    >
                                        {supportedLanguages
                                            .sort((a, b) => (a.language > b.language ? 1 : -1))
                                            .map((lang, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={JSON.stringify(lang)}
                                                        className="bg-[#0d1117] text-white"
                                                    >
                                                        {lang.language +
                                                            (lang.version
                                                                ? ` (${lang.version})`
                                                                : "")}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                    <PiCaretDownBold
                                        size={16}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Input textarea with line number */}
                        <div className="flex group flex-1">
                            <div className="w-10 text-gray-600 text-sm font-mono text-right pr-4 pt-2 select-none group-hover:text-gray-500 transition-colors">
                                02
                            </div>
                            <div className="flex-1 space-y-2 flex flex-col">
                                <label className="block text-sm text-gray-400 font-mono">
                                    <span className="text-purple-400">const</span> input <span className="text-gray-500">=</span>
                                </label>
                                <textarea
                                    className={`flex-1 min-h-[120px] w-full resize-none bg-[#0d1117] border rounded-lg px-4 py-3 text-white font-mono text-sm transition-all duration-200 focus:outline-none ${
                                        focusedField === 'input'
                                            ? 'border-blue-400 ring-2 ring-blue-400/20' 
                                            : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                    placeholder="Write your input here..."
                                    onChange={(e) => setInput(e.target.value)}
                                    onFocus={() => setFocusedField('input')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </div>
                        </div>

                        {/* Run button with line number */}
                        <div className="flex group">
                            <div className="w-10 text-gray-600 text-sm font-mono text-right pr-4 pt-2 select-none group-hover:text-gray-500 transition-colors">
                                03
                            </div>
                            <div className="flex-1">
                                <button
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-mono py-4 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                    onClick={runCode}
                                    disabled={isRunning}
                                >
                                    {isRunning ? (
                                        <>
                                            <LuLoader2 size={16} className="animate-spin" />
                                            <span>executing<span className="animate-pulse">...</span></span>
                                        </>
                                    ) : (
                                        <>
                                            <LuPlay size={16} />
                                            <span>
                                                <span className="text-yellow-400">await</span> execute()
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Output section with line number */}
                        <div className="flex group flex-1">
                            <div className="w-10 text-gray-600 text-sm font-mono text-right pr-4 pt-2 select-none group-hover:text-gray-500 transition-colors">
                                04
                            </div>
                            <div className="flex-1 space-y-2 flex flex-col">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm text-gray-400 font-mono">
                                        <span className="text-purple-400">const</span> output <span className="text-gray-500">=</span>
                                    </label>
                                    <button 
                                        onClick={copyOutput} 
                                        title="Copy Output"
                                        className="text-gray-400 hover:text-gray-300 transition-colors p-1 rounded hover:bg-gray-700/50"
                                    >
                                        <LuCopy size={16} />
                                    </button>
                                </div>
                                <div className="flex-1 w-full overflow-y-auto bg-[#0d1117] border border-gray-600 rounded-lg p-4 text-white font-mono text-sm">
                                    <code>
                                        <pre className="text-wrap whitespace-pre-wrap text-gray-300">
                                            {output || <span className="text-gray-500 italic">// Output will appear here...</span>}
                                        </pre>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status bar */}
                    <div className="bg-[#0d1117] border-t border-gray-700 px-6 py-3">
                        <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                            <div className="flex items-center gap-4">
                                <span>Language: {selectedLanguage.language}</span>
                                {selectedLanguage.version && <span>v{selectedLanguage.version}</span>}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600">⌘ + ⏎ to run</span>
                                <span>UTF-8</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RunView
