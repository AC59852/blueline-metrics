import teamInfo from '$lib/teamInfo/teams.json';

export async function load({ params }) {
  const teamAbbrev = params.id.toUpperCase();

  // Fetch full season schedule
  const scheduleRes = await fetch(`https://api-web.nhle.com/v1/club-schedule-season/${teamAbbrev}/20242025`);
  const scheduleData = await scheduleRes.json();

  const today = new Date();

  const recentGames = scheduleData.games
    .filter(game => new Date(game.gameDate) < today)
    .sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate))
    .slice(0, 10);

  const formattedGames = recentGames.map(game => {
    const isHome = game.homeTeam.abbrev === teamAbbrev;
    const opponentTeam = isHome ? game.awayTeam : game.homeTeam;
    const teamScore = isHome ? game.homeTeam.score : game.awayTeam.score;
    const opponentScore = isHome ? game.awayTeam.score : game.homeTeam.score;

    let result = 'L';
    if (teamScore > opponentScore) result = 'W';
    else if (teamScore === opponentScore) result = 'OT';

    return {
      gameId: game.id,
      gameDate: game.gameDate,
      opponentTeamName: opponentTeam.abbrev,
      isHome,
      result,
      score: `${teamScore} - ${opponentScore}`,
      threeMinRecap: game.threeMinRecap,
      gameCenterLink: game.gameCenterLink
    }
  });

  // Fetch current standings for all teams
  const standingsRes = await fetch(`https://api-web.nhle.com/v1/standings/now`);
  const standingsData = await standingsRes.json();

  // Flatten all divisions into one array of team records
  const allTeams = standingsData?.standings;

  // Find the current team using abbreviation
  const team = allTeams.find(t => t.teamAbbrev.default === teamAbbrev);

  console.log(team);

  if (!team) {
    return {
      status: 404,
      error: new Error(`Team ${teamAbbrev} not found in standings.`),
    };
  }

  const logoUrl = `https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_light.svg`;

  return {
    teamId: teamAbbrev.toLowerCase(),
    recentGames: formattedGames,
    teamInfo: {
      name: team.teamName.default,
      wins: team.wins,
      losses: team.losses,
      ot: team.otLosses,
      logo: logoUrl,
    },
  };
}
