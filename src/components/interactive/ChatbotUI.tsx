import { useState, useRef, useEffect, useCallback } from 'react';
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
  const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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
      className="flex flex-col h-full"
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
            style={{ animation: `blurIn 300ms ease-out both`, animationDelay: `${idx * 80}ms` }}
          >
            <div
              className={`max-w-xs px-4 py-3 ${
                msg.type === "bot"
                  ? "bg-surface-soft text-site-text rounded-2xl rounded-tl-sm"
                  : "bg-cta text-cta-fg rounded-2xl rounded-tr-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>

              {msg.actions && msg.actions.length > 0 && (
                <div className="mt-2 flex flex-col gap-2">
                  {msg.actions.map((action, actionIdx) => (
                    action.type === "link" ? (
                      <a
                        key={actionIdx}
                        href={action.href}
                        target={action.href?.startsWith("http") ? "_blank" : undefined}
                        rel={action.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-block px-3 py-1.5 bg-cta text-cta-fg rounded-xl text-xs font-semibold hover:opacity-90 transition-all duration-200 text-center"
                      >
                        {action.label}
                      </a>
                    ) : (
                      <button
                        key={actionIdx}
                        onClick={action.action}
                        className="px-3 py-1.5 bg-surface border border-cta/30 text-cta rounded-xl text-xs font-semibold hover:bg-cta/5 transition-all duration-200 w-full"
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
        <div className="border-t border-border px-4 py-3">
          <button
            onClick={handleReset}
            className="w-full px-3 py-2 text-xs font-semibold text-site-sub hover:text-site-text transition-all duration-200 border border-border rounded-xl hover:bg-surface-soft hover:border-cta/30"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
