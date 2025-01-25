<script setup>
  import {onMounted, ref} from 'vue'
  import {useToast} from 'primevue/usetoast'

  const toast = useToast()

  const password = ref('i_kiss_femboy_furries')
  let passwordGuess = ref('')
  let changing = ref(false)

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  const meow = 'Benjamin "boykisser" Garcia'

  let colorCode = ref()

  let colorRef = ref([])

  let code = ref()

  let correct = ref(false)

  function removeColor() {
    colorRef.value.pop()
  }

  onMounted(() => {
    let data = document.cookie.split('; ').find(row => row.startsWith('data='))
    if(!data) {
      const newCookie = {
        colorOrder: ['ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff'],
        colorCode: ['ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff'],
        code: 1234
      }
      document.cookie = "data=" + JSON.stringify(newCookie) + "; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/"
    }
    data = document.cookie.split('; ').find(row => row.startsWith('data='))
    let jsonDataString = data.match(/{.*}/)[0]
    data = JSON.parse(jsonDataString)
    colorOrder.value = data.colorOrder
    colorCode.value = data.colorCode
    code.value = data.code
    let length = colorOrder.value.length
    cardStyle.value[0] = colorOrder.value[getRandomInt(length)]
    cardStyle.value[1] = colorOrder.value[getRandomInt(length)]
    cardStyle.value[2] = colorOrder.value[getRandomInt(length)]
    cardStyle.value[3] = colorOrder.value[getRandomInt(length)]
    cardStyle.value[4] = colorOrder.value[getRandomInt(length)]
    cardStyle.value[5] = colorOrder.value[getRandomInt(length)]
    cardStyle.value[6] = colorOrder.value[getRandomInt(length)]
    cardStyle.value[7] = colorOrder.value[getRandomInt(length)]
  })

  let colorOrder = ref()

  function colorChange(card) {
    let length = colorOrder.value.length
    let color = cardStyle.value[card]
    let index = colorOrder.value.indexOf(color)
    index++
    if(index === length){
      index = 0
    }
    cardStyle.value[card] = colorOrder.value[index]
  }

  let cardStyle = ref([])

  function toggle() {
    if(changing.value === true) {
      changing.value = false
      prompt.value = false
    }
    else {
      prompt.value = prompt.value !== true;
    }
  }

  let prompt = ref(false)

  function checkPassword() {
    if (passwordGuess.value === password.value) {
      console.log('changing', changing.value)
      changing.value = true
      console.log('changing', changing.value)
      prompt.value = false
      colorRef.value = [...colorCode.value]
    }
    passwordGuess.value = ''
  }

  function addColor(i) {
    colorRef.value.push(colorOrder.value[i])
  }

  function submitChanges() {
    changing.value = false
    prompt.value = false
    colorCode.value = [...colorRef.value]
    const data = {
      colorOrder: colorOrder.value,
      colorCode: colorCode.value,
      code: code.value
    }
    document.cookie = "data="+JSON.stringify(data)+"; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/"
  }

  function checkCode() {
    let guess = [...cardStyle.value]
    let password = [...colorCode.value]
    console.log(guess)
    console.log(password)
    if (JSON.stringify(guess) === JSON.stringify(password)) {
      correct.value = true
    } else {
      incorrect()
    }
  }

  const incorrect = () => {
    toast.add({ severity: 'error', summary: 'Incorrect Code', detail: 'Please try again', life: 5000 });
  }
</script>

<template>
  <Toast position="top-right"/>
  <div class="absolute flex w-screen justify-center text-5xl" style="top: 10%;">Enter Code</div>
  <Badge value="?" severity="info" @click="toggle" class="ml-2 hover:cursor-pointer "></Badge>
  <div class="flex flex-row gap-4 h-fit w-screen absolute top-1/4 justify-center">
    <Card v-bind:style="{backgroundColor: '#'+cardStyle[0]}" @click="colorChange(0)" class="hover:cursor-pointer w-40 h-80 meow"></Card>
    <Card v-bind:style="{backgroundColor: '#'+cardStyle[1]}" @click="colorChange(1)" class="hover:cursor-pointer w-40 h-80 meow"></Card>
    <Card v-bind:style="{backgroundColor: '#'+cardStyle[2]}" @click="colorChange(2)" class="hover:cursor-pointer w-40 h-80 meow"></Card>
    <Card v-bind:style="{backgroundColor: '#'+cardStyle[3]}" @click="colorChange(3)" class="hover:cursor-pointer w-40 h-80 meow"></Card>
    <Card v-bind:style="{backgroundColor: '#'+cardStyle[4]}" @click="colorChange(4)" class="hover:cursor-pointer w-40 h-80 meow"></Card>
    <Card v-bind:style="{backgroundColor: '#'+cardStyle[5]}" @click="colorChange(5)" class="hover:cursor-pointer w-40 h-80 meow"></Card>
    <Card v-bind:style="{backgroundColor: '#'+cardStyle[6]}" @click="colorChange(6)" class="hover:cursor-pointer w-40 h-80 meow"></Card>
    <Card v-bind:style="{backgroundColor: '#'+cardStyle[7]}" @click="colorChange(7)" class="hover:cursor-pointer w-40 h-80 meow"></Card>
  </div>
  <div class="flex h-24 w-screen absolute top-3/4 justify-center">
    <Button type="submit" severity="primary" @click="checkCode" class="h-full mt-4 w-60" ><p class="text-2xl font-medium">Submit</p></Button>
  </div>
  <div v-if="prompt" style="height: 240px" class="w-screen absolute top-1/3">
    <Card class="w-80 h-full mx-auto drop-shadow-2xl">
      <template #title>
        <p>Admin Password</p>
      </template>
      <template #content>
        <div class="flex justify-center w-full">
          <div class="flex flex-col">
            <Password variant="filled" v-model="passwordGuess" placeholder="Password" :feedback="false" />
            <Button type="submit" severity="primary" label="Submit" @click="checkPassword" class="mt-4 w-54" ></Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
  <div v-if="correct" style="height: 280px; top: 27.5%" class="w-screen absolute">
    <Card class="w-80 h-full mx-auto drop-shadow-2xl">
      <template #title>
        <div class="flex justify-center w-full">
          <p>Correct! Here is your code:</p>
        </div>
      </template>
      <template #content>
        <div class="flex justify-center w-full">
          <div class="flex flex-col">
            <h1>{{ code }}</h1>
            <Button severity="danger" label="Close" @click="correct = false" class="w-20" ></Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
  <div v-if="changing" style="height: 330px; top: 26%" class="w-screen absolute">
    <Card style="width: 280px" class="h-full mx-auto drop-shadow-2xl">
      <template #title>
        <p>Colors and Codes</p>
      </template>
      <template #content>
        <div class="flex flex-col w-full">
          <div class="grid grid-rows-2 grid-cols-8 gap-2">
            <ColorPicker v-model="colorOrder[0]" />
            <ColorPicker v-model="colorOrder[1]" />
            <ColorPicker v-model="colorOrder[2]" />
            <ColorPicker v-model="colorOrder[3]" />
            <ColorPicker v-model="colorOrder[4]" />
            <ColorPicker v-model="colorOrder[5]" />
            <ColorPicker v-model="colorOrder[6]" />
            <ColorPicker v-model="colorOrder[7]" />
            <Badge class="rotate-180 ml-0.5 hover:cursor-pointer" @click="addColor(0)" severity="info">^</Badge>
            <Badge class="rotate-180 ml-0.5 hover:cursor-pointer" @click="addColor(1)" severity="info">^</Badge>
            <Badge class="rotate-180 ml-0.5 hover:cursor-pointer" @click="addColor(2)" severity="info">^</Badge>
            <Badge class="rotate-180 ml-0.5 hover:cursor-pointer" @click="addColor(3)" severity="info">^</Badge>
            <Badge class="rotate-180 ml-0.5 hover:cursor-pointer" @click="addColor(4)" severity="info">^</Badge>
            <Badge class="rotate-180 ml-0.5 hover:cursor-pointer" @click="addColor(5)" severity="info">^</Badge>
            <Badge class="rotate-180 ml-0.5 hover:cursor-pointer" @click="addColor(6)" severity="info">^</Badge>
            <Badge class="rotate-180 ml-0.5 hover:cursor-pointer" @click="addColor(7)" severity="info">^</Badge>
          </div>
          <div class="flex flex-row">
            <span v-for="item in colorRef">
              <Badge style="height: 24px; width: 24px" class="mr-0.5" :style="{ backgroundColor: '#'+item }"></Badge>
            </span>
            <Badge class="ml-auto mb-1 -rotate-90 hover:cursor-pointer" severity="danger" @click="removeColor">^</Badge>
          </div>
          <div>
            <InputNumber variant="filled" class="w-full mt-2" v-model="code" inputId="integeronly" :useGrouping="false" />
          </div>
          <Button type="submit" severity="primary" label="Submit" @click="submitChanges" class="mt-4 w-full" ></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
  .meow {
    transition: scale 0.3s;
  }
  .meow:active {
    scale: 90%;
  }
</style>