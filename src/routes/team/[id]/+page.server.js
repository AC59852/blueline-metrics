import teamInfo from '$lib/teamInfo/teams.json';

export function load({params}) {

  const isUpperCase = (str) => {
    return str === str.toUpperCase();
  }

  // Convert the team ID to lowercase for case-insensitive matching
  params.id = isUpperCase(params.id) ? params.id.toLowerCase() : params.id;

  const custom = teamInfo.find(t => t.id.toLowerCase() === params.id);
  return {
    teamId: params.id,
    ...custom
  }
}