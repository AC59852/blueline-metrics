import teamInfo from "$lib/teamInfo/teams.json";

export async function load({ params }) {
  const teamAbbrev = params.id.toUpperCase();

  // Fetch team roster as of current
  const rosterRes = await fetch(`https://api-web.nhle.com/v1/roster/${teamAbbrev}/current`);
  const rosterData = await rosterRes.json();

  const logo = `https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_light.svg`;
  
  return {
    roster: rosterData,
    teamId: params.id,
    // find the team info from the teamInfo JSON
    teamInfo: teamInfo.find(team => team.id === teamAbbrev) || {
      name: team.name,
    },
    logo: logo
  }
}