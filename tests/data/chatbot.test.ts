import { describe, it, expect } from "vitest";
import { chatbotTree } from "../../src/data/chatbot";

describe("chatbot decision tree", () => {
  it("has a start node", () => {
    expect(chatbotTree["start"]).toBeDefined();
  });

  it("every option.next points to an existing node", () => {
    for (const [key, node] of Object.entries(chatbotTree)) {
      if (node.options) {
        for (const opt of node.options) {
          expect(
            chatbotTree[opt.next],
            `"${key}" option "${opt.label}" points to missing node "${opt.next}"`,
          ).toBeDefined();
        }
      }
    }
  });

  it("terminal nodes have an action and actionType", () => {
    for (const [key, node] of Object.entries(chatbotTree)) {
      if (node.type === "terminal") {
        expect(node.action, `terminal node "${key}" missing action`).toBeTruthy();
        expect(node.actionType, `terminal node "${key}" missing actionType`).toBeTruthy();
        expect(["call", "link", "email"]).toContain(node.actionType);
      }
    }
  });

  it("non-terminal nodes have options", () => {
    for (const [key, node] of Object.entries(chatbotTree)) {
      if (node.type !== "terminal") {
        expect(
          node.options?.length,
          `non-terminal node "${key}" has no options`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("every node is reachable from start", () => {
    const visited = new Set<string>();
    const queue = ["start"];
    while (queue.length > 0) {
      const current = queue.pop()!;
      if (visited.has(current)) continue;
      visited.add(current);
      const node = chatbotTree[current];
      if (node?.options) {
        for (const opt of node.options) {
          queue.push(opt.next);
        }
      }
    }
    const allKeys = new Set(Object.keys(chatbotTree));
    expect(visited).toEqual(allKeys);
  });
});
