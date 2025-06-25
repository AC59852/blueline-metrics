<script>

  let divisions = [
    { name: 'Atlantic Division' },
    { name: 'Metropolitan Division' },
    { name: 'Central Division' },
    { name: 'Pacific Division' }
  ]

  let teams = [
    { name: 'Boston Bruins', division: 'Atlantic Division', logo: '/path/to/logo1.png' },
    { name: 'New York Rangers', division: 'Metropolitan Division', logo: '/path/to/logo2.png' },
    { name: 'Chicago Blackhawks', division: 'Central Division', logo: '/path/to/logo3.png' },
    { name: 'Los Angeles Kings', division: 'Pacific Division', logo: '/path/to/logo4.png' }
  ];

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
          <h2>{team.name}</h2>
          <p>{team.division}</p>
          <img src={team.logo} alt={team.name + " Logo"}>
        </li>
      {/each}
    </ul>
  </section>
</main>