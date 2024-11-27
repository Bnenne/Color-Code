<script setup>
  import { ref, onMounted } from 'vue'
  import { ApiService, FetchEventsTeams } from "@/services/ApiService.js"

  let retrieved = ref(false)

  async function fetchData() {
    try {
      let selectedRoute = `${route.value}${event.value}${team.value}${team2.value}${team3.value}`
      console.log(selectedRoute)
      apiResponse.value = 'fetching'
      const response = await ApiService.request(selectedRoute)
      const data = await response.json()
      apiResponse.value = processData(data)
      console.log("retrieved")
      retrieved.value = true
    } catch (error) {
      console.error('Error fetching data:', error)
      apiResponse.value = "Oh no! Something went wrong, is the route correct?"
    }
  }

  function processData(data) {
    const general = [];
    const masses = [];

    // Process the general and masses data
    for (const section of ['general', 'masses']) {
      const sectionData = data[section];

      // Determine the target array (general or masses)
      const targetArray = section === 'general' ? general : masses;

      // Combine the data into objects for each key
      const length = Object.keys(sectionData.auto_score).length; // Assuming all arrays have the same length

      for (let i = 0; i < length; i++) {
        targetArray.push({
          x: sectionData.x[i],
          y: sectionData.y[i],
          auto_score: sectionData.auto_score[i],
          team: sectionData.team[i],
          label: sectionData.label[i]
        });
      }
    }

    return { general, masses };
  }

  const routes = ([
    {route: '/data', text: 'data'},
    {route: '/graph', text: 'graph'},
    {route: '/compare/graph', text: 'compare'}
  ])
  const events = ([
    {route: '/events', text: 'All 2024 Events'},
    {route: '/2024wila', text: 'Seven Rivers Regional'},
    {route: '/2024cttd', text: 'CowTown ThrowDown'}
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
  const apiResponse = ref(null)
  const fetchedEventsTeams = ref(null)

  async function collectData() {
    try {
      fetchedEventsTeams.value = await FetchEventsTeams.request()
    }catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  onMounted(() => {
    collectData()
  })
</script>

<template>
  <div class="h-screen">
    <Card class="w-fit h-56 mx-auto bg-gray-950">
      <template #content>
        <form  @submit.prevent="fetchData">
          <div class="flex flex-row">
            <Select
                v-model="route"
                :options="routes"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Route"
            />
            <Select
                v-model="event"
                :options="events"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select an Event"
            />
            <Select
                filter
                v-model="team"
                :options="teams"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                v-if="route === '/compare/graph'"
                filter
                v-model="team2"
                :options="teams"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                v-if="route !== '/compare/graph'"
                disabled
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                v-if="route === '/compare/graph'"
                filter show-clear
                v-model="team3"
                :options="teamsOther"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                v-if="route !== '/compare/graph'"
                disabled
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Button
                class="w-28"
                label="Submit"
                type="submit"
            />
          </div>
        </form>
        <Divider />
        <Message class="font-sans" severity="success">Selected Route: {{ route }}{{ event }}{{ team }}{{ team2 }}{{ team3 }}</Message>
        <Divider />
        <ProgressBar class="h-2 w-auto" mode="indeterminate" v-if="apiResponse === 'fetching'"></ProgressBar>
      </template>
    </Card>
    <div>
      <p v-if="retrieved">API Response: {{ apiResponse.general }}</p>
      <p v-if="retrieved">API Response: {{ apiResponse.masses }}</p>
      <p>{{ fetchedEventsTeams }}</p>
<!--      <DataTable v-if="retrieved" :value="apiResponse.general" tableStyle="min-width: 50rem">-->
<!--        <Column field="team" header="Team"></Column>-->
<!--        <Column field="x" header="X"></Column>-->
<!--        <Column field="y" header="Y"></Column>-->
<!--        <Column field="auto_score" header="Auto Pieces Scored"></Column>-->
<!--        <Column field="label" header="Label"></Column>-->
<!--      </DataTable>-->
<!--      <DataTable v-if="retrieved" :value="apiResponse.masses" tableStyle="min-width: 50rem">-->
<!--        <Column field="team" header="Team"></Column>-->
<!--        <Column field="x" header="Average X"></Column>-->
<!--        <Column field="y" header="Average Y"></Column>-->
<!--        <Column field="auto_score" header="Average Auto Pieces Scored"></Column>-->
<!--        <Column field="label" header="Label"></Column>-->
<!--      </DataTable>-->
    </div>
  </div>
</template>