// Saves a LeetCode snapshot the site uses when the live API is unavailable
// (e.g. static hosting). Run: npm run leetcode
import fs from 'node:fs'
import { fetchLeetCode } from '../server/leetcode.js'

const username = process.argv[2] || 'priyanshu2068'
const out = new URL('../src/leetcode-snapshot.json', import.meta.url)
const data = await fetchLeetCode(username)
fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n')
console.log(`Saved ${data.solved.all} solved / rank ${data.ranking} for ${data.username}`)
