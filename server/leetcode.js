// Fetches a LeetCode profile from the public GraphQL endpoint and normalises it.
// Shared by the API route (/api/leetcode) and the snapshot script (npm run leetcode).

const QUERY = `query ($u: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $u) {
    username
    submissionCalendar
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    languageProblemCount { languageName problemsSolved }
    badges { displayName }
  }
  userContestRanking(username: $u) { attendedContestsCount rating globalRanking topPercentage }
}`

const byDifficulty = (rows = []) =>
  Object.fromEntries(rows.map((r) => [r.difficulty.toLowerCase(), r.count]))

export async function fetchLeetCode(username) {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query: QUERY, variables: { u: username } }),
  })
  if (!res.ok) throw new Error(`LeetCode responded ${res.status}`)
  const { data } = await res.json()
  const user = data?.matchedUser
  if (!user) throw new Error(`LeetCode user "${username}" not found`)

  const contest = data.userContestRanking
  return {
    username: user.username,
    fetchedAt: new Date().toISOString(),
    ranking: user.profile?.ranking ?? null,
    solved: byDifficulty(user.submitStatsGlobal?.acSubmissionNum),
    total: byDifficulty(data.allQuestionsCount),
    languages: (user.languageProblemCount || [])
      .map((l) => ({ name: l.languageName, solved: l.problemsSolved }))
      .sort((a, b) => b.solved - a.solved),
    badges: (user.badges || []).map((b) => b.displayName),
    // { unixSeconds: submissions } for roughly the last year
    calendar: JSON.parse(user.submissionCalendar || '{}'),
    contest: contest?.attendedContestsCount
      ? {
          attended: contest.attendedContestsCount,
          rating: Math.round(contest.rating),
          globalRanking: contest.globalRanking,
          topPercentage: contest.topPercentage,
        }
      : null,
  }
}
