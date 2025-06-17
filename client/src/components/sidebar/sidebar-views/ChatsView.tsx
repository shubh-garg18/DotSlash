import ChatInput from "@/components/chats/ChatInput"
import ChatList from "@/components/chats/ChatList"
import useResponsive from "@/hooks/useResponsive"

const ChatsView = () => {
    const { viewHeight } = useResponsive()

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col relative"
            style={{ height: viewHeight }}
        >
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-lg blur-3xl pointer-events-none"></div>
            
            {/* Chat container */}
            <div className="relative z-10 flex flex-col h-full bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm m-4">
                {/* Enhanced header */}
                <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-lg border border-gray-700">
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                <span className="text-sm font-mono text-gray-300">chat.js</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-400 transition-colors cursor-pointer">
                                <span className="text-sm font-mono">group</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-xs font-mono text-gray-500">live</span>
                        </div>
                    </div>
                </div>

                {/* Title section */}
                <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-3 flex-shrink-0">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-mono font-bold text-white">
                            <span className="text-blue-400">.</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-400">chat</span>
                        </h1>
                        <p className="text-sm text-gray-400 font-mono">
                            <span className="text-green-500">// </span>
                            group collaboration
                        </p>
                    </div>
                </div>

                {/* Chat content area */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Chat list */}
                    <div className="flex-1 overflow-hidden">
                        <ChatList />
                    </div>
                    
                    {/* Chat input */}
                    <div className="flex-shrink-0 border-t border-gray-700 bg-[#0d1117]">
                        <ChatInput />
                    </div>
                </div>

                {/* Enhanced status bar */}
                <div className="bg-[#0d1117] border-t border-gray-700 px-6 py-3 flex-shrink-0">
                    <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                        <div className="flex items-center gap-4">
                            <span>
                                <span className="text-purple-400">const</span> status <span className="text-gray-600">=</span> <span className="text-green-400">'connected'</span>
                            </span>
                            <span className="text-orange-400">Group Chat</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">real-time messaging</span>
                            <span className="text-blue-400">UTF-8</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatsView
