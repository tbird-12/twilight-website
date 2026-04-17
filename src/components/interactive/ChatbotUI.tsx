import { useState, useRef, useEffect, useCallback } from "preact/hooks";
import type { ChatTree } from "../../data/chatbot";

interface ChatMessage {
  type: "bot" | "user";
  text: string;
  actions?: Array<{ label: string; type: "button" | "link"; href?: string; action?: () => void }>;
}

interface ChatbotUIProps {
  tree: ChatTree;
}

export default function ChatbotUI({ tree }: ChatbotUIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [currentNode, setCurrentNode] = useState("start");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Clean up pending timeout on unmount
  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) clearTimeout(pendingTimeoutRef.current);
    };
  }, []);

  const handleOptionClick = useCallback(
    (nextNode: string, selectedLabel?: string) => {
      // Use the label passed directly to avoid stale closure over currentNode
      const optionLabel = selectedLabel || tree[currentNode]?.options?.find(
        (opt) => opt.next === nextNode
      )?.label;

      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          text: optionLabel || "Selected option",
        },
      ]);

      // Navigate to next node
      setCurrentNode(nextNode);
      const nextNodeData = tree[nextNode];

      if (!nextNodeData) return;

      // Add bot response with slight delay for better UX
      pendingTimeoutRef.current = setTimeout(() => {
        const botMessage: ChatMessage = {
          type: "bot",
          text: nextNodeData.text,
        };

        if (nextNodeData.options) {
          botMessage.actions = nextNodeData.options.map((opt) => ({
            label: opt.label,
            type: "button" as const,
            action: () => handleOptionClick(opt.next, opt.label),
          }));
        } else if (nextNodeData.actionType && nextNodeData.actionValue) {
          botMessage.actions = [
            {
              label: nextNodeData.action || "Continue",
              type: "link" as const,
              href:
                nextNodeData.actionType === "call"
                  ? `tel:${nextNodeData.actionValue}`
                  : nextNodeData.actionType === "email"
                    ? `mailto:${nextNodeData.actionValue}`
                    : nextNodeData.actionValue,
            },
          ];
        }

        setMessages((prev) => [...prev, botMessage]);
      }, 300);
    },
    [currentNode, tree]
  );

  const handleReset = useCallback(() => {
    if (pendingTimeoutRef.current) clearTimeout(pendingTimeoutRef.current);
    setCurrentNode("start");
    setMessages([
      {
        type: "bot",
        text: tree["start"]?.text || "Hi there!",
        actions: tree["start"]?.options?.map((opt) => ({
          label: opt.label,
          type: "button" as const,
          action: () => handleOptionClick(opt.next, opt.label),
        })),
      },
    ]);
  }, [tree, handleOptionClick]);

  // Initialize messages on mount
  useEffect(() => {
    handleReset();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      class="flex flex-col h-full"
    >
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} class={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}>
            <div
              class={`max-w-xs px-3 py-2 rounded-lg ${
                msg.type === "bot"
                  ? "bg-surface-soft text-site-text"
                  : "bg-icon text-surface"
              }`}
            >
              <p class="text-sm leading-relaxed">{msg.text}</p>

              {msg.actions && msg.actions.length > 0 && (
                <div class="mt-2 flex flex-col gap-2">
                  {msg.actions.map((action, actionIdx) => (
                    action.type === "link" ? (
                      <a
                        key={actionIdx}
                        href={action.href}
                        target={action.href?.startsWith("http") ? "_blank" : undefined}
                        rel={action.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        class="inline-block px-3 py-1 bg-icon text-surface rounded text-xs font-semibold hover:opacity-90 transition-opacity text-center"
                      >
                        {action.label}
                      </a>
                    ) : (
                      <button
                        key={actionIdx}
                        onClick={action.action}
                        class="px-3 py-1 bg-icon text-surface rounded text-xs font-semibold hover:opacity-90 transition-opacity w-full"
                      >
                        {action.label}
                      </button>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {currentNode !== "start" && (
        <div class="border-t border-border px-4 py-3">
          <button
            onClick={handleReset}
            class="w-full px-3 py-2 text-xs font-semibold text-site-sub hover:text-site-text transition-colors border border-border rounded hover:bg-surface-soft"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
