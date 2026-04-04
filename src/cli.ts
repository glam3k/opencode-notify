#!/usr/bin/env bun

import { $ } from "bun";
import { join } from "node:path";
import { homedir } from "node:os";

const NOTIFY_PUSH = join(homedir(), ".config/bin/notify_push");

const parseArgs = () => {
  const [, , ...args] = process.argv;
  if (args.length === 0) {
    return {
      title: "OpenCode: Test Notification",
      body: "This is a test from opencode-notify",
    };
  }

  const [title, ...rest] = args;
  return {
    title,
    body: rest.length > 0 ? rest.join(" ") : "This is a test from opencode-notify",
  };
};

async function main() {
  const { title, body } = parseArgs();
  console.log(`Sending notification via ${NOTIFY_PUSH}`);

  try {
    await $`${NOTIFY_PUSH} ${title} ${body}`;
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Failed to send notification:", error);
    process.exitCode = 1;
  }
}

main();
