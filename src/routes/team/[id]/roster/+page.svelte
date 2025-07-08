<script>
  export let data;

  
  const forwards = data.roster.forwards;
  const defensemen = data.roster.defensemen;
  const goalies = data.roster.goalies;

  // format the players heightInInches to feet and inches
  function formatHeight(heightInInches) {
    const feet = Math.floor(heightInInches / 12);
    const inches = heightInInches % 12;
    return `${feet}' ${inches}"`;
  }

  console.log(data);
</script>

<section class="last10">
  <section class="last10__team">
    <img src="{data.logo}" alt="{data.teamInfo.name} Logo" class="last10__teamLogo">
    <div>
    </div>
  </section>
  <section class="last10__data">
    <table class="last10__table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Num #</th>
          <th>Pos</th>
          <th>Shoots</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Born</th>
          <th>Birthplace</th>
        </tr>
      </thead>
      <tbody>
        {#each data.roster.forwards as player}
          <tr>
            <td>
              <div class="roster__playerWrapper">
                <a href="/player/{player.id}"><img src="{player.headshot}" alt="Image of {player.firstName.default} {player.lastName.default}"></a>
                <a href="/player/{player.id}">{player.firstName.default} {player.lastName.default}</a>
              </div>
            </td>
            <td>{player.sweaterNumber}</td>
            <!-- if position code is either L or R, add a W after -->
            <td>{player.positionCode === 'L' || player.positionCode === 'R' ? player.positionCode + 'W' : player.positionCode}</td>
            <td>{player.shootsCatches}</td>
            <td>{formatHeight(player.heightInInches)}</td>
            <td>{player.weightInPounds} lbs</td>
            <!-- the born date in data is formatted "year-month-day" as numbers. I want it formatted like "Month Day, Year" with month being short-form month (oct, feb, etc) -->
            <td>{new Date(String(player.birthDate)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
            <td>{player.birthCity.default}, {player.birthCountry}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</section>