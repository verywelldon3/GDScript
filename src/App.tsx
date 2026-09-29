import { useState } from "react";
import { topics } from "./data/gdscript-topics";
import TopicCard from "./components/TopicCard";
import CodeBlock from "./components/CodeBlock";

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTopic = topics.find((t) => t.id === activeTopicId)!;

  const filteredSnippets = searchQuery
    ? topics.flatMap((topic) =>
        topic.snippets
          .filter(
            (snippet) =>
              snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              snippet.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
              snippet.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
          .map((snippet) => ({ ...snippet, topicTitle: topic.title, topicIcon: topic.icon }))
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-sm">
                  GD
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    GDScript Справочник
                  </h1>
                  <p className="text-[10px] text-gray-500 -mt-0.5">Godot Engine 4.x</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Поиск по коду и тегам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Version badge */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-medium">
                Godot 4.x
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`fixed lg:static inset-y-0 left-0 z-40 w-72 lg:w-64 xl:w-72 transform transition-transform duration-300 lg:transform-none ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            } bg-gray-950 lg:bg-transparent pt-20 lg:pt-0 px-4 lg:px-0 overflow-y-auto`}
          >
            <div className="sticky top-20">
              <div className="mb-4">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                  Разделы
                </h2>
              </div>
              <nav className="space-y-1">
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isActive={activeTopicId === topic.id && !searchQuery}
                    onClick={() => {
                      setActiveTopicId(topic.id);
                      setSearchQuery("");
                      setSidebarOpen(false);
                    }}
                  />
                ))}
              </nav>

              {/* Info card */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-800/30">
                <p className="text-xs text-blue-300/80 leading-relaxed">
                  💡 GDScript — встроенный язык Godot Engine. 
                  Этот справочник содержит основные паттерны и примеры кода для Godot 4.x.
                </p>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {searchQuery ? (
              /* Search Results */
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Результаты поиска: "{searchQuery}"
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Найдено: {filteredSnippets.length}{" "}
                    {filteredSnippets.length === 1
                      ? "совпадение"
                      : filteredSnippets.length < 5
                      ? "совпадения"
                      : "совпадений"}
                  </p>
                </div>
                {filteredSnippets.length > 0 ? (
                  <div className="space-y-6">
                    {filteredSnippets.map((snippet, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-2 mb-3">
                          <span>{snippet.topicIcon}</span>
                          <span className="text-xs text-gray-500 font-medium">
                            {snippet.topicTitle}
                          </span>
                        </div>
                        <CodeBlock
                          code={snippet.code}
                          title={snippet.title}
                          description={snippet.description}
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                          {snippet.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-800 rounded-md text-xs text-gray-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-gray-400">Ничего не найдено</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Попробуйте изменить запрос
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Topic Content */
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{activeTopic.icon}</span>
                    <h2 className="text-2xl font-bold text-white">
                      {activeTopic.title}
                    </h2>
                  </div>
                  <p className="text-gray-400 ml-12">
                    {activeTopic.description}
                  </p>
                </div>

                <div className="space-y-8">
                  {activeTopic.snippets.map((snippet, idx) => (
                    <div key={idx}>
                      <CodeBlock
                        code={snippet.code}
                        title={snippet.title}
                        description={snippet.description}
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {snippet.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-800/60 border border-gray-700/30 rounded-md text-xs text-gray-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation between topics */}
                <div className="mt-12 pt-6 border-t border-gray-800/50">
                  <div className="flex justify-between">
                    {topics.findIndex((t) => t.id === activeTopicId) > 0 ? (
                      <button
                        onClick={() => {
                          const idx = topics.findIndex(
                            (t) => t.id === activeTopicId
                          );
                          setActiveTopicId(topics[idx - 1].id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/30 text-sm text-gray-300 hover:text-white transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {topics[topics.findIndex((t) => t.id === activeTopicId) - 1].title}
                      </button>
                    ) : (
                      <div />
                    )}
                    {topics.findIndex((t) => t.id === activeTopicId) <
                    topics.length - 1 ? (
                      <button
                        onClick={() => {
                          const idx = topics.findIndex(
                            (t) => t.id === activeTopicId
                          );
                          setActiveTopicId(topics[idx + 1].id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/30 text-sm text-gray-300 hover:text-white transition-all"
                      >
                        {topics[topics.findIndex((t) => t.id === activeTopicId) + 1].title}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            GDScript Справочник • Создано для разработчиков Godot Engine
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Все примеры кода совместимы с Godot 4.x
          </p>
        </div>
      </footer>
    </div>
  );
}
