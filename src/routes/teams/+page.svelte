<script>
  import teamInfo from "$lib/teamInfo/teams.json";

  let divisions = [
    { name: 'Atlantic Division' },
    { name: 'Metropolitan Division' },
    { name: 'Central Division' },
    { name: 'Pacific Division' }
  ]

  let teams = teamInfo.map(team => ({
    id: team.id,
    name: team.name,
  }));

  let selected = $state('all');

  let filteredTeams = $derived.by(() => {
    if (selected === 'all') {
      return teams;
    }
    return teams.filter(team => team.division === selected);
  });

  function handleDivisionChange(event) {
    selected = event.target.value;
  }

</script>

<main class="wrapper wrapper--fixed teams">
  <section class="teams__wrapper">
    <div class="teams__header">
      <h2>{selected.charAt(0).toUpperCase() + selected.slice(1)} Teams</h2>
      <div class="teams__dropdown">
        <label for="teams-dropdown">Select a Team</label>
        <select id="teams-dropdown" bind:value={selected} on:change={handleDivisionChange} class="teams__dropdown-select">
          <option value="all" selected>All</option>
          {#each divisions as division}
            <option value={division.name}>{division.name}</option>
          {/each}
        </select>
      </div>
    </div>
    <ul class="teams__list">
      {#each filteredTeams as team}
        <li class="teams__team">
          <a href="/team/{team.id}" class="teams__team-link">
            <h2>{team.name}</h2>
            <img src="https://assets.nhle.com/logos/nhl/svg/{team.id}_dark.svg" alt={team.name + " Logo"}>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</main>