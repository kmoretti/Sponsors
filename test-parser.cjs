const fs = require('node:fs');
const body = `### 赞助者名称\n\n张三\n\n### 头像链接\n\nhttps://example.com/zhangsan.jpg\n\n### 赞助日期\n\n2026-07-01\n\n### 赞助金额\n\n168`;

function extractField(body, fieldLabel) {
  const escaped = fieldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`###\\s*${escaped}\\s*\\n{2}(.*?)(?:\\n###|\\n$|$)`, 's');
  const match = body.match(regex);
  return match ? match[1].trim() : '';
}

const name = extractField(body, '赞助者名称');
const avatar = extractField(body, '头像链接');
const date = extractField(body, '赞助日期');
const amount = extractField(body, '赞助金额');

console.log('name:', name);
console.log('avatar:', avatar);
console.log('date:', date);
console.log('amount:', amount);

const newEntry = {
  name,
  avatar: avatar || null,
  date,
  amount: isNaN(Number(amount)) ? amount : Number(amount)
};

console.log('entry:', JSON.stringify(newEntry));
