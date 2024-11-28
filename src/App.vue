<script setup>
import {onMounted, ref} from 'vue'
import {ApiService, getScouting, tbaNames} from "@/services/ApiService.js"
import Column from "primevue/column"
import {useToast} from 'primevue/usetoast';

const toast = useToast()

  const retrieved = ref(false)
  const retrieving = ref(false)
  const isError = ref('')
  const dataType = ref('')
  const imageUrl = ref('')
  const dev = ref(false)

  async function fetchData() {
    try {
      retrieved.value = false
      let newTeam = team3.value
      if(newTeam === null){
        newTeam = ''
      }
      let selectedRoute = `${route.value}${route2.value}${event.value}${team.value}${team2.value}${newTeam}`
      dataType.value = route2.value
      console.log('selectedRoute', selectedRoute)
      retrieving.value = true
      const response = await ApiService.request({route: selectedRoute, dev: dev.value})
      if(dataType.value === '/data'){
        const data = await response.json()
        generalData.value = Object.keys(data.general.auto_score).map(key => ({
          x: data.general.x[key],
          y: data.general.y[key],
          auto_score: data.general.auto_score[key],
          team: data.general.team[key],
          label: data.general.label[key]
        }));
        massesData.value = Object.keys(data.masses.auto_score).map(key => ({
          x: parseFloat(data.masses.x[key].toFixed(1)),
          y: parseFloat(data.masses.y[key].toFixed(1)),
          auto_score: parseFloat(data.masses.auto_score[key].toFixed(1)),
          team: parseFloat(data.masses.team[key].toFixed(1)),
          label: parseFloat(data.masses.label[key].toFixed(1))
        }));
      }
      else {
        const data = await response.blob()
        imageUrl.value = URL.createObjectURL(data);
      }
      console.log("retrieved")
      retrieving.value = false
      retrieved.value = true
    } catch (error) {
      console.error('Error fetching data:', error)
      retrieving.value = false
      retrieved.value = false
      isError.value = "Oh no! Something went wrong, is the route correct?"
    }
  }

  const routes = ref([
    {route: '/auto', text: 'Auto'},
  ])
  const routes2 = ref([
    {route: '/data', text: 'Data'},
    {route: '/graph', text: 'Graph'},
    {route: '/compare/graph', text: 'Compare'}
  ])
  const events = ref('')
  const teams = ref('')

  const route = ref('/auto')
  const route2 = ref('')
  const event = ref('/events')
  const team = ref('')
  const team2 = ref('')
  const team3 = ref(null)
  const generalData = ref(null)
  const massesData = ref(null)

  function routeChange() {
    if (route2.value !== '/compare/graph') {
      team2.value = ''
      team3.value = null
      isError.value = ''
    }
  }
  function onChange() {
    isError.value = ''
  }

  async function scoutingApi() {
    teams.value = ''
    events.value = ''
    const response = await getScouting.request(dev.value)
    const data = await response.json()
    const eventsData = data.events
    const teamsData = data.teams
    let newEvents = []
    let newTeams = []
    eventsData.forEach(e => {
        if(e !== '2024practice') {
          if(e !== '2024week0') {
            newEvents.push(e)
          }
      }
    })
    teamsData.forEach(e => {
      newTeams.push({route: '/frc'+e,text: e})
    })
    newEvents = await named(newEvents)
    newEvents.sort((a, b) => a.text.localeCompare(b.text))
    events.value = newEvents
    teams.value = newTeams
    teams.value.sort((a, b) => a.text - b.text)
    events.value.unshift({route: '/events', text: 'All 2024 Events'})
  }

  async function named(data) {
    return await tbaNames.request(data)
  }

  function devChange() {
    scoutingApi()
  }

  onMounted(() => {
    scoutingApi()
  })

  const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Verify that the team attended the event, as not all teams have attended every event.', life: 5000 });
  }
const showDev = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: "This will turn on dev mode, if you're not a dev this will break the everything.", life: 5000 });
}
</script>

<template>
  <div class="h-full">
    <div class="flex flex-row absolute p-4 top-0 left-0">
      <ToggleSwitch @change="devChange" v-model="dev" />
      <Badge severity="info" class="hover:cursor-pointer ml-4 my-auto" @click="showDev" value="!"></Badge>
    </div>
    <Card class="w-fit mx-auto mb-4" style="height: 176px">
      <template #content>
        <form  @submit.prevent="fetchData">
          <div class="flex flex-row">
            <Select
                @change="onChange"
                v-model="route"
                :options="routes"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Route"
            />
            <Select
                @change="routeChange"
                v-model="route2"
                :options="routes2"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Route"
            />
            <Select
                filter
                v-if="events !== '' && event === '/events'"
                @change="onChange"
                v-model="event"
                :options="events"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select an Event"
            />
            <Select
                filter
                v-if="events !== '' && event !== '/events'"
                @change="onChange"
                v-model="event"
                :options="events"
                optionLabel="text"
                optionValue="route"
                class="mr-2"
                style="width: 144px"
                placeholder="Select an Event"
            />
            <Toast position="bottom-left"/>
            <Badge v-if="event !== '/events' && teams !== '' && events !== ''" severity="info" class="hover:cursor-pointer mr-2 my-auto" @click="show" value="!"></Badge>
            <Select
                v-if="teams !== ''"
                @change="onChange"
                filter
                v-model="team"
                :options="teams"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                @change="onChange"
                v-if="route2 === '/compare/graph' && teams !== ''"
                filter
                v-model="team2"
                :options="teams"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                v-if="route2 !== '/compare/graph' && teams !== ''"
                disabled
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                @change="onChange"
                v-if="route2 === '/compare/graph' && teams !== ''"
                filter show-clear
                v-model="team3"
                :options="teams"
                optionLabel="text"
                optionValue="route"
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                v-if="route2 !== '/compare/graph' && teams !== ''"
                disabled
                class="w-44 mr-2"
                placeholder="Select a Team"
            />
            <Select
                v-if="teams === '' && events === ''"
                loading
                class="mr-2"
                style="width: 728px"
                placeholder="Loading..."
            />
            <Button
                class="w-28"
                label="Submit"
                type="submit"
            />
          </div>
        </form>
        <ProgressBar style="height: 8px; margin-top: 16px; margin-bottom: 16px" :value="0" v-if="!retrieving"></ProgressBar>
        <ProgressBar style="height: 8px; margin-top: 16px; margin-bottom: 16px" mode="indeterminate" v-if="retrieving"></ProgressBar>
        <Message v-if="isError === ''" class="font-sans" severity="success">Selected Route: {{ route }}{{ route2 }}{{ event }}{{ team }}{{ team2 }}{{ team3 }}</Message>
        <Message v-if="isError !== ''" class="font-sans" severity="error">{{ isError }}</Message>
      </template>
    </Card>
      <div v-if="retrieved" class="w-full mb-4 flex justify-center">
        <Splitter v-if="dataType === '/data'" class="w-fit h-fit">
          <SplitterPanel>
            <Card class="h-full">
              <template #title>General</template>
              <template #content>
                <DataTable :value="generalData">
                  <Column field="team" header="Team"></Column>
                  <Column field="x" header="X"></Column>
                  <Column field="y" header="Y"></Column>
                  <Column field="auto_score" header="Auto Pieces Scored"></Column>
                  <Column field="label" header="Label"></Column>
                </DataTable>
              </template>
            </Card>
          </SplitterPanel>
          <SplitterPanel>
            <Card class="h-full">
              <template #title>Masses</template>
              <template #content>
                <DataTable :value="massesData">
                  <Column field="team" header="Team"></Column>
                  <Column field="x" header="Average X"></Column>
                  <Column field="y" header="Average Y"></Column>
                  <Column field="auto_score" header="Average Auto Pieces Scored"></Column>
                  <Column field="label" header="Label"></Column>
                </DataTable>
              </template>
            </Card>
          </SplitterPanel>
        </Splitter>
        <img v-if="dataType !== '/data'" :src="imageUrl" alt="Fetched Image" />
      </div>
  </div>
</template>