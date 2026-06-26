/**
 * GitHub Actions 辅助脚本：从关闭的 Issue 中提取赞助数据，
 * 追加到 src/lib/data/sponsors.json 底部。
 *
 * 使用方式：node add-sponsor.mjs
 * 环境变量：
 *   - ISSUE_BODY: Issue 表单提交的完整 body
 *   - FILE_PATH:  目标 JSON 文件路径（相对于仓库根目录）
 */

import fs from 'node:fs';
import path from 'node:path';

const { ISSUE_BODY, FILE_PATH = 'src/lib/data/sponsors.json' } = process.env;

if (!ISSUE_BODY) {
  console.error('❌ 缺少 ISSUE_BODY 环境变量');
  process.exit(1);
}

/**
 * 从 Issue Form 的 body 中提取指定字段值。
 * 表单提交后 body 格式为：
 *
 *   ### 字段名
 *
 *   值
 *
 */
function extractField(body, fieldLabel) {
  const escaped = fieldLabel
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`###\\s*${escaped}\\s*\\n{2}(.*?)(?:\\n###|\\n$|$)`, 's');
  const match = body.match(regex);
  return match ? match[1].trim() : '';
}

// 提取字段 —— 注意 label 必须与 .github/ISSUE_TEMPLATE/sponsor.yml 中的 label 一致
const name = extractField(ISSUE_BODY, '赞助者名称');
const avatar = extractField(ISSUE_BODY, '头像链接');
const date = extractField(ISSUE_BODY, '赞助日期');
const amount = extractField(ISSUE_BODY, '赞助金额');

if (!name || !date || !amount) {
  console.error('❌ 缺少必填字段（name / date / amount）');
  console.error(`  name=${name}  avatar=${avatar}  date=${date}  amount=${amount}`);
  process.exit(1);
}

const newEntry = {
  name,
  avatar: avatar || null,
  date,
  amount: isNaN(Number(amount)) ? amount : Number(amount)
};

// 读取现有 JSON
const filePath = path.resolve(FILE_PATH);
let existing = [];
try {
  const raw = fs.readFileSync(filePath, 'utf-8');
  existing = JSON.parse(raw);
  if (!Array.isArray(existing)) throw new Error('根元素必须是数组');
} catch (err) {
  console.error(`❌ 读取或解析 ${filePath} 失败:`, err.message);
  process.exit(1);
}

// 追加并写回
existing.push(newEntry);
fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');

console.log(`✅ 已追加赞助者: ${name} (${date}, ¥${amount})`);
