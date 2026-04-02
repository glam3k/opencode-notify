import type { Plugin } from "@opencode-ai/plugin";
import { join } from "node:path";
import { homedir } from "node:os";

export const NotifyPlugin: Plugin = async ({ $ }) => {
  // Path to your existing notifier script
  const NOTIFY_PUSH = join(homedir(), ".config/bin/notify_push");

  return {
    event: async ({ event }) => {
      let title = "";
      let body = "";

      switch (event.type) {
        case "session.idle": {
          title = "OpenCode: Turn complete";
          body = "Check terminal for results";
          break;
        }

        case "permission.asked": {
          title = "OpenCode: Approval needed";
          body = "Action requires your permission";
          break;
        }
        case "session.error": {
          // @ts-ignore - event.properties.error may not exist but we handle it
          title = "OpenCode: Error";
          body = (event as any).properties?.error?.message || "An error occurred";
          break;
        }
        default:
          return; // Ignore other events
      }

      try {
        // Bun's $ shell API handles the execution
        await $`${NOTIFY_PUSH} "${title}" "${body}"`;
      } catch (err) {
        // Fail silently if the script is missing or errors out
        console.error("Notification failed:", err);
      }
    },
  };
};
