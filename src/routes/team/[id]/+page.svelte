<script>
  import { page } from "$app/stores";
  import NavComponent from "$lib/components/NavComponent.svelte";

  export let data;

  let teamId = $page.params.id;

  console.log(data)

</script>

<main class="wrapper wrapper--fixed team">
  <nav class="team__nav">
    <ul>
      <li><a href="/team/{teamId}">Landing</a></li>
      <li><a href="/team/{teamId}/last10">Last 10 Games</a></li>
      <li><a href="/team/{teamId}/roster">Roster</a></li>
      <li><a href="/team/{teamId}/stats">Stats</a></li>
      <li><a href="/team/{teamId}/schedule">Schedule</a></li>
      <li><a href="/team/{teamId}/standings">Standings</a></li>
    </ul>
  </nav>
  <section class="team__logoWrapper">
    <img src="/path/to/team/logo.png" alt="Team Logo">
  </section>
  <section class="team__info">
    <div class="team__content">
      <h1 class="team__name">Team Name: {teamId}</h1>
      <h2>W/L | Conference placement | League placement</h2>
      <h3>{data.foundingYear} | {data.arena}</h3>
    </div>
  </section>
</main>