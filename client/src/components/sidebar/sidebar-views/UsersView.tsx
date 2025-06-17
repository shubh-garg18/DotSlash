import Users from "@/components/common/Users"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import useResponsive from "@/hooks/useResponsive"
import { USER_STATUS } from "@/types/user"
import toast from "react-hot-toast"
import { GoSignOut } from "react-icons/go"
import { IoShareOutline } from "react-icons/io5"
import { LuCopy } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

function UsersView() {
    const navigate = useNavigate()
    const { viewHeight } = useResponsive()
    const { setStatus } = useAppContext()
    const { socket } = useSocket()

    const copyURL = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy URL to clipboard")
            console.log(error)
        }
    }

    const shareURL = async () => {
        const url = window.location.href
        try {
            await navigator.share({ url })
        } catch (error) {
            toast.error("Unable to share URL")
            console.log(error)
        }
    }

    const leaveRoom = () => {
        socket.disconnect()
        setStatus(USER_STATUS.DISCONNECTED)
        navigate("/", {
            replace: true,
        })
    }

    return (
        <div className="flex flex-col p-6" style={{ height: viewHeight }}>
            {/* Enhanced title */}
            <h1 className="text-2xl font-mono font-bold text-white mb-6">
                <span className="text-blue-400">.</span>
                <span className="text-gray-300">/</span>
                <span className="text-purple-400">users</span>
            </h1>
            
            {/* List of connected users */}
            <div className="flex-1 mb-6">
                <Users />
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col items-center gap-4">
                <div className="flex w-full gap-3">
                    {/* Share URL button */}
                    <button
                        className="flex flex-grow items-center justify-center gap-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-gray-600 hover:border-gray-500 p-4 text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                        onClick={shareURL}
                        title="Share Room Link"
                    >
                        <IoShareOutline size={20} />
                        <span className="font-mono text-sm hidden sm:inline">Share</span>
                    </button>
                    
                    {/* Copy URL button */}
                    <button
                        className="flex flex-grow items-center justify-center gap-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-gray-600 hover:border-gray-500 p-4 text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                        onClick={copyURL}
                        title="Copy Room Link"
                    >
                        <LuCopy size={18} />
                        <span className="font-mono text-sm hidden sm:inline">Copy</span>
                    </button>
                    
                    {/* Leave room button */}
                    <button
                        className="flex flex-grow items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 border border-red-500 p-4 text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-600/25"
                        onClick={leaveRoom}
                        title="Leave Room"
                    >
                        <GoSignOut size={20} />
                        <span className="font-mono text-sm hidden sm:inline">Leave</span>
                    </button>
                </div>
                
                {/* Subtle hint text */}
                <p className="text-xs text-gray-500 font-mono text-center">
                    <span className="text-green-500">// </span>
                    Share the room link to invite collaborators
                </p>
            </div>
        </div>
    )
}

export default UsersView
