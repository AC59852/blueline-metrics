<script>
  import NavComponent from "$lib/components/NavComponent.svelte";

  export let data;

  console.log(data)

  // Function to convert number to ordinal (1st, 2nd, 3rd, etc.)
  function getOrdinal(num) {
    const number = parseInt(num);
    if (isNaN(number)) return num;
    
    const suffix = ["th", "st", "nd", "rd"];
    const value = number % 100;
    
    return number + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
  }

</script>
<section class="team__logoWrapper">
  <img src="{data.teamInfo.logo}" alt="Team Logo">
</section>
<section class="team__info">
  <div class="team__content">
    <h1 class="team__name">Team Name: {data.name}</h1>
    <h2>{data.teamInfo.wins}-{data.teamInfo.losses}-{data.teamInfo.otLosses} | {getOrdinal(data.teamInfo.divisionPlacement)} in {data.teamInfo.divisionName} Division | {getOrdinal(data.teamInfo.leagueRank)} in League</h2>
    <h3>{data.foundingYear} | {data.arena}</h3>
  </div>
</section>