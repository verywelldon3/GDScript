import { Topic } from "../data/gdscript-topics";

interface TopicCardProps {
  topic: Topic;
  isActive: boolean;
  onClick: () => void;
}

export default function TopicCard({ topic, isActive, onClick }: TopicCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-blue-600/20 border border-blue-500/40 shadow-lg shadow-blue-500/10"
          : "hover:bg-gray-800/60 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{topic.icon}</span>
        <div>
          <h3
            className={`font-semibold text-sm transition-colors ${
              isActive ? "text-blue-300" : "text-gray-300 group-hover:text-white"
            }`}
          >
            {topic.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
            {topic.description}
          </p>
        </div>
      </div>
    </button>
  );
}
