import { Plugin } from "@opencode-ai/plugin";
import { join } from "node:path";
import { homedir } from "node:os";

console.log("Testing notification...");

// Direct test of the notification functionality
const NOTIFY_PUSH = join(homedir(), ".config/bin/notify_push");

try {
  // Using Bun's $ shell API to execute the notify_push command
  await $`${NOTIFY_PUSH} "Test Notification" "This is a test from opencode-notify"`;
  console.log("Notification sent successfully");
} catch (err) {
  console.error("Failed to send notification:", err);
}