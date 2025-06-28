<script>
  import { page } from "$app/stores";
  import NavComponent from "$lib/components/NavComponent.svelte";

  export let data;

  let teamId = $page.params.id;

  console.log(data);
</script>
<main class="last10">
  <section class="last10__team">
    <img src="{data.teamInfo.logo}" alt="{data.teamInfo.name} Logo" class="last10__teamLogo">
    <div>
      <h1>{data.teamInfo.name} | Last 10 Games</h1>
      <h2>{data.teamInfo.wins}-{data.teamInfo.losses}-{data.teamInfo.ot}</h2>
    </div>
  </section>
  <section class="last10__data">
    <table class="last10__table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Opponent</th>
          <th>Home/Away</th>
          <th>Result</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {#each data.recentGames as game}
          <tr>
            <td>{new Date(game.gameDate).toLocaleDateString()}</td>
            <td>vs {game.opponentTeamName}</td>
            <td>{game.isHome ? 'Home' : 'Away'}</td>
            <td>{game.result}</td>
            <td>{game.score}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</main>