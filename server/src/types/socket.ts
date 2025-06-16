import { Socket } from "socket.io"

type SocketId = string

enum SocketEvent {
	SYNC_FILE_STRUCTURE = "sync-file-structure",
	JOIN_ACCEPTED = "join-accepted",
	USER_JOINED = "user-joined",
	JOIN_REQUEST = "join-request",
	USER_DISCONNECTED = "user-disconnected",
	DIRECTORY_CREATED = "directory-created",
	DIRECTORY_DELETED = "directory-deleted",
	DIRECTORY_UPDATED = "directory-updated",
	DIRECTORY_RENAMED = "directory-renamed",
	FILE_RENAMED = "file-renamed",
	FILE_UPDATED = "file-updated",
	FILE_DELETED = "file-deleted",
	USER_OFFLINE = "offline",
	FILE_CREATED = "file-created",
	SEND_MESSAGE = "send-message",
	RECEIVE_MESSAGE = "receive-message",
	USERNAME_EXISTS = "username-exists",
	TYPING_START = "typing-start",
	TYPING_PAUSE = "typing-pause",
	USER_ONLINE = "online",
	SYNC_DRAWING = "sync-drawing",
	DRAWING_UPDATE = "drawing-update",
	REQUEST_DRAWING = "request-drawing",
}

interface SocketContext {
	socket: Socket
}

export { SocketEvent, SocketContext, SocketId }
