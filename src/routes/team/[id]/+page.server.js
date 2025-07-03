import teamInfo from '$lib/teamInfo/teams.json';

export async function load({ params }) {
  const teamAbbrev = params.id.toUpperCase();

  const isUpperCase = (str) => str === str.toUpperCase();
  params.id = isUpperCase(params.id) ? params.id.toLowerCase() : params.id;

  // Fetch current standings
  const standingsRes = await fetch(`https://api-web.nhle.com/v1/standings/now`);
  const standingsData = await standingsRes.json();

  // Flatten team records
  const allTeamRecords = standingsData?.standings;

  // Sort by total points descending
  const sortedByPoints = [...allTeamRecords].sort((a, b) => b.points - a.points);

  // Find the current team in the list
  const team = allTeamRecords.find(t => t.teamAbbrev.default === teamAbbrev);
  const index = sortedByPoints.findIndex(t => t.teamAbbrev.default === teamAbbrev);

  if (!team || index === -1) {
    return {
      status: 404,
      error: {
        message: `Team ${teamAbbrev} not found in standings.`
      }
    };
  }

  const logoUrl = `https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_light.svg`;
  const custom = teamInfo.find(t => t.id.toLowerCase() === params.id);

  return {
    teamId: params.id,
    teamInfo: {
      name: team.teamName.default,
      wins: team.wins,
      losses: team.losses,
      otLosses: team.otLosses,
      logo: logoUrl,
      leagueRank: index + 1 // 1-based rank
    },
    ...custom
  };
}
