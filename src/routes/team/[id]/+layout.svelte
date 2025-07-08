<script>
  import { page } from "$app/stores";

  let teamId = $page.params.id;
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
  <slot />
</main>