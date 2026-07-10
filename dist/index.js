// src/index.ts
import { join } from "path";
import { homedir } from "os";
var NotifyPlugin = async ({ $ }) => {
  const NOTIFY_PUSH = join(homedir(), ".config/bin/notify_push");
  return {
    event: async ({ event }) => {
      let title = "";
      let body = "";
      const type = event.type;
      switch (type) {
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
          title = "OpenCode: Error";
          body = event.properties?.error?.message || "An error occurred";
          break;
        }
        default:
          return;
      }
      try {
        await $`${NOTIFY_PUSH} "${title}" "${body}"`;
      } catch (err) {
        console.error("Notification failed:", err);
      }
    }
  };
};
var src_default = NotifyPlugin;
export {
  NotifyPlugin,
  src_default as default
};
//# sourceMappingURL=index.js.map