import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()
    const [isGenerating, setIsGenerating] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const roomIdRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = async () => {
        setIsGenerating(true)
        // Simulate generation delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500))
        setCurrentUser({ ...currentUser, roomId: uuidv4() })
        toast.success("New room ID generated!")
        setIsGenerating(false)
        usernameRef.current?.focus()
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateForm = () => {
        if (currentUser.username.trim().length === 0) {
            toast.error("Enter your username")
            usernameRef.current?.focus()
            return false
        } else if (currentUser.roomId.trim().length === 0) {
            toast.error("Enter a room ID")
            roomIdRef.current?.focus()
            return false
        } else if (currentUser.roomId.trim().length < 5) {
            toast.error("Room ID must be at least 5 characters long")
            roomIdRef.current?.focus()
            return false
        } else if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long")
            usernameRef.current?.focus()
            return false
        }
        return true
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        toast.loading("Connecting to room...")
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            const form = document.querySelector('form')
            if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success("Enter your username to join")
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
<<<<<<< HEAD
            navigate(`/editor/${currentUser.roomId}`, {
=======
            navigate(/editor/${currentUser.roomId}, {
>>>>>>> 6550d6090e7d5041bce090885c62d41b6a74a8dd
                state: { username },
            })
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    const getConnectionStatus = () => {
        switch (status) {
            case USER_STATUS.ATTEMPTING_JOIN:
                return { color: 'bg-yellow-400', text: 'connecting' }
            case USER_STATUS.JOINED:
                return { color: 'bg-green-400', text: 'connected' }
            default:
                return { color: 'bg-gray-400', text: 'offline' }
        }
    }

    const connectionStatus = getConnectionStatus()

    return (
        <div className="w-full max-w-lg relative">
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-3xl"></div>
            
            <div className="relative bg-[#161b22] border border-gray-700 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-lg border border-gray-700">
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                <span className="text-sm font-mono text-gray-300">session.js</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-400 transition-colors cursor-pointer">
                                <span className="text-sm font-mono">room.js</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
<<<<<<< HEAD
                            <div className={`w-2 h-2 rounded-full ${connectionStatus.color} ${status === USER_STATUS.ATTEMPTING_JOIN ? 'animate-pulse' : ''}`}></div>
=======
                            <div className={w-2 h-2 rounded-full ${connectionStatus.color} ${status === USER_STATUS.ATTEMPTING_JOIN ? 'animate-pulse' : ''}}></div>
>>>>>>> 6550d6090e7d5041bce090885c62d41b6a74a8dd
                            <span className="text-xs font-mono text-gray-500">{connectionStatus.text}</span>
                        </div>
                    </div>
                </div>

                {/* Editor content */}
                <div className="p-8 space-y-8">
                    {/* Enhanced brand section */}
                    <div className="text-center space-y-3">
                        <h1 className="text-4xl font-mono font-bold text-white">
                            <span className="text-blue-400">.</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-400">slash</span>
                        </h1>
                        <p className="text-sm text-gray-400 font-mono">
                            <span className="text-green-500">// </span>
                            collaborative code editor
                        </p>
                    </div>

                    <form onSubmit={joinRoom} className="space-y-6">
                        <div className="flex group">
                            <div className="w-10 text-gray-600 text-sm font-mono text-right pr-4 pt-2 select-none group-hover:text-gray-500 transition-colors">
                                01
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm text-gray-400 font-mono">
                                    <span className="text-purple-400">const</span> roomId <span className="text-gray-500">=</span>
                                </label>
                                <div className="relative">
                                    <input
                                        ref={roomIdRef}
                                        type="text"
                                        name="roomId"
                                        placeholder="Enter room ID or generate new one"
                                        className={`w-full bg-[#0d1117] border rounded-lg px-4 py-3 text-white font-mono text-sm transition-all duration-200 focus:outline-none ${
                                            focusedField === 'roomId' || currentUser.roomId
                                                ? 'border-blue-400 ring-2 ring-blue-400/20' 
                                                : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                        onChange={handleInputChanges}
                                        onFocus={() => setFocusedField('roomId')}
                                        onBlur={() => setFocusedField(null)}
                                        value={currentUser.roomId}
                                    />
                                    {currentUser.roomId && (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex group">
                            <div className="w-10 text-gray-600 text-sm font-mono text-right pr-4 pt-2 select-none group-hover:text-gray-500 transition-colors">
                                02
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm text-gray-400 font-mono">
                                    <span className="text-purple-400">const</span> username <span className="text-gray-500">=</span>
                                </label>
                                <div className="relative">
                                    <input
                                        ref={usernameRef}
                                        type="text"
                                        name="username"
                                        placeholder="Enter your display name"
                                        className={`w-full bg-[#0d1117] border rounded-lg px-4 py-3 text-white font-mono text-sm transition-all duration-200 focus:outline-none ${
                                            focusedField === 'username' || currentUser.username
                                                ? 'border-blue-400 ring-2 ring-blue-400/20' 
                                                : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                        onChange={handleInputChanges}
                                        onFocus={() => setFocusedField('username')}
                                        onBlur={() => setFocusedField(null)}
                                        value={currentUser.username}
                                    />
                                    {currentUser.username && (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="flex group">
                            <div className="w-10 text-gray-600 text-sm font-mono text-right pr-4 pt-2 select-none group-hover:text-gray-500 transition-colors">
                                03
                            </div>
                            <div className="flex-1">
                                <button
                                    type="submit"
                                    disabled={status === USER_STATUS.ATTEMPTING_JOIN}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-mono py-4 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none shadow-lg hover:shadow-xl"
                                >
                                    {status === USER_STATUS.ATTEMPTING_JOIN ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>connecting<span className="animate-pulse">...</span></span>
                                        </span>
                                    ) : (
                                        <span>
                                            <span className="text-yellow-400">await</span> joinRoom()
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex group">
                            <div className="w-10 text-gray-600 text-sm font-mono text-right pr-4 pt-2 select-none group-hover:text-gray-500 transition-colors">
                                04
                            </div>
                            <div className="flex-1">
                                <button
                                    type="button"
                                    onClick={createNewRoomId}
                                    disabled={isGenerating}
                                    className="text-green-400 hover:text-green-300 font-mono text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin"></div>
                                            <span>generating<span className="animate-pulse">...</span></span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-gray-500">//</span> generateRoomId()
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="bg-[#0d1117] border-t border-gray-700 px-6 py-3">
                    <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                        <div className="flex items-center gap-4">
                            <span>Ln 1, Col 1</span>
                            <span>JavaScript</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">⌘ + ⏎ to join</span>
                            <span>UTF-8</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormComponent
