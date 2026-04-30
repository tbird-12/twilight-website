import { createRoot, type Root } from "react-dom/client";
import ChatbotUI from "./ChatbotUI";
import { chatbotTree, type ChatTree } from "../../data/chatbot";
import { EMAIL_ADDRESS } from "../../data/resource";

const mountedRoots = new WeakMap<HTMLElement, Root>();

function cloneChatTree(tree: ChatTree): ChatTree {
  const clonedTree: ChatTree = {};

  for (const key of Object.keys(tree)) {
    const node = tree[key];

    clonedTree[key] = {
      ...node,
      options: node.options?.map((option) => ({ ...option })),
    };
  }

  return clonedTree;
}

function buildChatbotTree(): ChatTree {
  const tree = cloneChatTree(chatbotTree);
  const easternHour = Number.parseInt(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "America/New_York",
    }).format(new Date()),
    10,
  );
  const isOffHours = easternHour < 9 || easternHour >= 17;

  if (isOffHours && tree.admin) {
    tree.admin = {
      ...tree.admin,
      text: "Our office is currently closed. Please email us and we'll get back to you on the next business day.",
      action: "Email Office",
      actionType: "email",
      actionValue: EMAIL_ADDRESS,
    };
  }

  return tree;
}

export function mountChatbot(container: HTMLElement) {
  if (mountedRoots.has(container)) {
    return;
  }

  const root = createRoot(container);
  mountedRoots.set(container, root);
  root.render(<ChatbotUI tree={buildChatbotTree()} />);
}
