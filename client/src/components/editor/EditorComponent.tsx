import { useFileSystem } from "@/context/FileContext"
import useResponsive from "@/hooks/useResponsive"
import cn from "classnames"
import Editor from "./Editor"
import FileTab from "./FileTab"

function EditorComponent() {
    const { openFiles } = useFileSystem()
    const { minHeightReached } = useResponsive()

    if (openFiles.length <= 0) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-[#161b22] border border-gray-700 rounded-lg m-4">
                <div className="text-center space-y-2">
                    <h1 className="text-xl text-white font-mono">
                        No file is currently open
                    </h1>
                    <p className="text-sm text-gray-400 font-mono">
                        <span className="text-green-500">// </span>
                        select a file to start editing
                    </p>
                </div>
            </div>
        )
    }

    return (
        <main
            className={cn("flex w-full flex-col overflow-x-auto md:h-screen bg-[#161b22] border border-gray-700 rounded-lg m-4", {
                "h-[calc(100vh-50px)]": !minHeightReached,
                "h-full": minHeightReached,
            })}
        >
            <FileTab />
            <Editor />
        </main>
    )
}

export default EditorComponent