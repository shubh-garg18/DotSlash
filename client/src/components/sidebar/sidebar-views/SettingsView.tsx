import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { editorThemes } from "@/resources/Themes"
import { langNames } from "@uiw/codemirror-extensions-langs"
import { ChangeEvent, useEffect } from "react"

function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontFamily(e.target.value)
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setTheme(e.target.value)
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setLanguage(e.target.value)
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontSize(parseInt(e.target.value))

    useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller",
        ) as HTMLElement
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col relative"
            style={{ height: viewHeight }}
        >
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-lg blur-3xl pointer-events-none"></div>
            
            {/* Settings container */}
            <div className="relative z-10 flex flex-col h-full bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm m-4">
                {/* Enhanced header */}
                <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-lg border border-gray-700">
                                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                <span className="text-sm font-mono text-gray-300">settings.js</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-400 transition-colors cursor-pointer">
                                <span className="text-sm font-mono">config</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            <span className="text-xs font-mono text-gray-500">dev</span>
                        </div>
                    </div>
                </div>

                {/* Title section */}
                <div className="bg-[#0d1117] border-b border-gray-700 px-6 py-3 flex-shrink-0">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-mono font-bold text-white">
                            <span className="text-blue-400">.</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-purple-400">settings</span>
                        </h1>
                        <p className="text-sm text-gray-400 font-mono">
                            <span className="text-green-500">// </span>
                            editor configuration
                        </p>
                    </div>
                </div>

                {/* Settings content area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Font Family and Size */}
                    <div className="space-y-4">
                        <h3 className="text-white font-mono">Font Settings</h3>
                        <div className="flex w-full items-end gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-400 mb-2">Font Family</label>
                                <Select
                                    onChange={handleFontFamilyChange}
                                    value={fontFamily}
                                    options={editorFonts}
                                    title="Font Family"
                                />
                            </div>
                            
                            <div className="w-32">
                                <label className="block text-sm text-gray-400 mb-2">Font Size</label>
                                <select
                                    value={fontSize}
                                    onChange={handleFontSizeChange}
                                    className="w-full rounded-md border border-gray-700 bg-[#0d1117] px-4 py-3 text-white outline-none focus:border-blue-400 transition-colors"
                                    title="Font Size"
                                >
                                    {[...Array(13).keys()].map((size) => {
                                        return (
                                            <option key={size} value={size + 12}>
                                                {size + 12}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Theme */}
                    <div className="space-y-4">
                        <h3 className="text-white font-mono">Theme</h3>
                        <Select
                            onChange={handleThemeChange}
                            value={theme}
                            options={Object.keys(editorThemes)}
                            title="Theme"
                        />
                    </div>

                    {/* Language */}
                    <div className="space-y-4">
                        <h3 className="text-white font-mono">Language</h3>
                        <Select
                            onChange={handleLanguageChange}
                            value={language}
                            options={langNames}
                            title="Language"
                        />
                    </div>
                </div>

                {/* Reset button */}
                <div className="bg-[#0d1117] border-t border-gray-700 p-6 flex-shrink-0">
                    <button
                        className="w-full rounded-md border border-gray-700 bg-[#161b22] px-6 py-3 text-white outline-none hover:bg-[#1c2128] hover:border-gray-600 focus:border-blue-400 transition-all"
                        onClick={resetSettings}
                    >
                        Reset to Default
                    </button>
                </div>

                {/* Enhanced status bar */}
                <div className="bg-[#0d1117] border-t border-gray-700 px-6 py-3 flex-shrink-0">
                    <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                        <div className="flex items-center gap-4">
                            <span>
                                <span className="text-purple-400">const</span> status <span className="text-gray-600">=</span> <span className="text-green-400">'configured'</span>
                            </span>
                            <span className="text-orange-400">Editor Settings</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">preferences saved</span>
                            <span className="text-blue-400">JSON</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsView
