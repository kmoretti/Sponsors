import { rmSync, existsSync } from "node:fs";
const dir = "E:\\kmoretti-github\\donate\\.svelte-kit\\cloudflare";
if (existsSync(dir)) {
  rmSync(dir, { recursive: true, force: true });
  console.log("DELETED");
} else {
  console.log("NOT_EXIST");
}
