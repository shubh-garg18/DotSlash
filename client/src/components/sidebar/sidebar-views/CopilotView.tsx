import { useCopilot } from "@/context/CopilotContext"
import { useFileSystem } from "@/context/FileContext"
import { useSocket } from "@/context/SocketContext"
import useResponsive from "@/hooks/useResponsive"
import { SocketEvent } from "@/types/socket"
import toast from "react-hot-toast"
import { LuClipboardPaste, LuCopy, LuRepeat, LuSparkles, LuTerminal } from "react-icons/lu"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"

function CopilotView() {
    const {socket} = useSocket()
    const { viewHeight } = useResponsive()
    const { generateCode, output, isRunning, setInput } = useCopilot()
    const { activeFile, updateFileContent, setActiveFile } = useFileSystem()

    const copyOutput = async () => {
        try {
            const content = output.replace(/[\w]*\n?/g, "").trim()
            await navigator.clipboard.writeText(content)
            toast.success("Output copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy output to clipboard")
            console.log(error)
        }
    }

    const pasteCodeInFile = () => {
        if (activeFile) {
            const fileContent = activeFile.content
                ? `${activeFile.content}\n`
                : ""
            const content = `${fileContent}${output.replace(/[\w]*\n?/g, "").trim()}`
            updateFileContent(activeFile.id, content)
            setActiveFile({ ...activeFile, content })
            toast.success("Code pasted successfully")
            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent: content,
            })
        }
    }

    const replaceCodeInFile = () => {
        if (activeFile) {
            const isConfirmed = confirm(
                Are you sure you want to replace the code in the file?,
            )
            if (!isConfirmed) return
            const content = output.replace(/```[\w]*\n?/g, "").trim()
            updateFileContent(activeFile.id, content)
            setActiveFile({ ...activeFile, content })
            toast.success("Code replaced successfully")
            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent: content,
            })
        }
    }

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col relative"
            style={{ height: viewHeight }}
        >
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-purple-500/5 rounded-lg blur-3xl pointer-events-none"></div>
            
            {/* Copilot container */}
            <div className="relative z-10 flex flex-col h-full bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm m-4">
                {/* Enhanced header */}
                <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-lg border border-gray-700">
                                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                <span className="text-sm font-mono text-gray-300">copilot.js</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-400 transition-colors cursor-pointer">
                                <LuTerminal size={14} />
                                <span className="text-sm font-mono">AI</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                            <span className="text-xs font-mono text-gray-500">ready</span>
                        </div>
                    </div>
                </div>

                {/* Title section */}
                <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-3 flex-shrink-0">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-mono font-bold text-white flex items-center justify-center gap-2">
                            <LuSparkles className="text-purple-400" size={24} />
                            <span className="text-purple-400">.</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-400">copilot</span>
                        </h1>
                        <p className="text-sm text-gray-400 font-mono">
                            <span className="text-green-500">// </span>
                            AI-powered code generation
                        </p>
                    </div>
                </div>

                {/* Input section */}
                <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-4 flex-shrink-0">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                            <span className="text-blue-400">function</span>
                            <span className="text-yellow-400">generateCode</span>
                            <span className="text-gray-600">(</span>
                            <span className="text-purple-400">prompt</span>
                            <span className="text-gray-600">)</span>
                        </div>
                        <textarea
                            className="w-full h-24 rounded-lg border border-gray-600 bg-[#161b22] p-4 text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm resize-none"
                            placeholder="// Describe the code you want to generate..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-mono font-bold text-white transition-all hover:from-purple-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-purple-600 disabled:hover:to-blue-600"
                            onClick={generateCode}
                            disabled={isRunning}
                        >
                            <LuSparkles size={16} />
                            {isRunning ? "Generating..." : "Generate Code"}
                        </button>
                    </div>
                </div>

                {/* Output section */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Action buttons */}
                    {output && (
                        <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-3 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="text-xs font-mono text-gray-500">
                                    <span className="text-green-500">// </span>
                                    Generated output
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        title="Copy Output" 
                                        onClick={copyOutput}
                                        className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#161b22] border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        <LuCopy size={14} />
                                        <span className="text-xs font-mono">copy</span>
                                    </button>
                                    <button
                                        title="Replace code in file"
                                        onClick={replaceCodeInFile}
                                        className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#161b22] border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        <LuRepeat size={14} />
                                        <span className="text-xs font-mono">replace</span>
                                    </button>
                                    <button
                                        title="Paste code in file"
                                        onClick={pasteCodeInFile}
                                        className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#161b22] border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        <LuClipboardPaste size={14} />
                                        <span className="text-xs font-mono">paste</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Code output */}
                    <div className="flex-1 overflow-y-auto bg-[#161b22] p-6">
                        {output ? (
                            <div className="h-full">
                                <ReactMarkdown
                                    components={{
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        code({ inline, className, children, ...props }: any) {
                                            const match = /language-(\w+)/.exec(className || "")
                                            const language = match ? match[1] : "javascript"

                                            return !inline ? (
                                                <SyntaxHighlighter
                                                    style={dracula}
                                                    language={language}
                                                    PreTag="pre"
                                                    className="!m-0 !rounded-lg !bg-[#0d1117] !border !border-gray-700"
                                                    customStyle={{
                                                        padding: '1.5rem',
                                                        fontSize: '0.875rem',
                                                        lineHeight: '1.5'
                                                    }}
                                                >
                                                    {String(children).replace(/\n$/, "")}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className="bg-[#0d1117] text-purple-400 px-2 py-1 rounded text-sm font-mono border border-gray-700" {...props}>
                                                    {children}
                                                </code>
                                            )
                                        },
                                        pre({ children }) {
                                            return <pre className="h-full">{children}</pre>
                                        },
                                        p({ children }) {
                                            return <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                                        },
                                        h1({ children }) {
                                            return <h1 className="text-xl font-bold text-white mb-4 font-mono">{children}</h1>
                                        },
                                        h2({ children }) {
                                            return <h2 className="text-lg font-bold text-gray-200 mb-3 font-mono">{children}</h2>
                                        },
                                        h3({ children }) {
                                            return <h3 className="text-md font-bold text-gray-300 mb-2 font-mono">{children}</h3>
                                        }
                                    }}
                                >
                                    {output}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <LuSparkles className="mx-auto text-purple-400 opacity-50" size={48} />
                                    <div className="space-y-2">
                                        <p className="text-gray-400 font-mono">No code generated yet</p>
                                        <p className="text-gray-500 text-sm font-mono">
                                            <span className="text-green-500">// </span>
                                            Enter a prompt above to get started
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced status bar */}
                <div className="bg-[#0d1117] border-t border-gray-700 px-6 py-3 flex-shrink-0">
                    <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                        <div className="flex items-center gap-4">
                            <span>
                                <span className="text-purple-400">const</span> status <span className="text-gray-600">=</span> <span className="text-green-400">'{isRunning ? "generating" : "ready"}'</span>
                            </span>
                            <span className="text-orange-400">AI Copilot</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">powered by AI</span>
                            <span className="text-blue-400">v1.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CopilotView
