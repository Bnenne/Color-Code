<script setup>
  import { ref } from 'vue'
  import FetchCall from "@/service/ApiService.js";

  const routes = ([
    {route: '/graph', text: 'graph'},
    {route: '/data', text: 'data'},
    {route: '/compare/graph', text: 'compare'}
  ])
  const events = ([
    {route: '/2024wila', text: 'Seven Rivers Regional'},
    {route: '/2024cttd', text: 'CowTown ThrowDown'},
  ])
  const teams = ([
    {route: '/frc1710', text: '1710'},
    {route: '/frc1730', text: '1730'},
    {route: '/frc1986', text: '1986'},
    {route: '/frc1987', text: '1987'}
  ])
  const teamsOther = ([
    {route: '', text: ''},
    {route: '/frc1710', text: '1710'},
    {route: '/frc1730', text: '1730'},
    {route: '/frc1986', text: '1986'},
    {route: '/frc1987', text: '1987'}
  ])
  const route = ref('')
  const event = ref('')
  const team = ref('')
  const team2 = ref('')
  const team3 = ref('')
</script>

<template>
  <div class="h-screen">
    <form @submit.prevent="">
      <select v-model="route">
        <option
            v-for="route in routes"
            :key="route.route"
            :value="route.route"
        >
          {{ route.text }}
        </option>
      </select>
      <select v-model="event">
        <option
            v-for="event in events"
            :key="event.route"
            :value="event.route"
        >
          {{ event.text }}
        </option>
      </select>
      <select v-model="team">
        <option
            v-for="team in teams"
            :key="team.route"
            :value="team.route"
        >
          {{ team.text }}
        </option>
      </select>
      <select v-model="team2" v-if="route === '/compare/graph'">
        <option
            v-for="team in teams"
            :key="team.route"
            :value="team.route"
        >
          {{ team.text }}
        </option>
      </select>
      <select v-model="team3" v-if="route === '/compare/graph'">
        <option
            v-for="team in teamsOther"
            :key="team.route"
            :value="team.route"
        >
          {{ team.text }}
        </option>
      </select>
    </form>
    <div>
      route: {{ route }}{{ event }}{{ team }}{{ team2 }}{{ team3 }}
    </div>
  </div>
</template>