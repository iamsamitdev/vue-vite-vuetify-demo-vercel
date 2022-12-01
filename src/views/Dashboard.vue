<template>
  <div class="pa-2">
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <apexchart
          height="400"
          type="area"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-col>
      <v-col cols="12" sm="6">
        <apexchart
          height="400"
          type="line"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <apexchart
          height="400"
          type="bar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-col>
      <v-col cols="12" sm="6">
        <apexchart
          height="400"
          type="scatter"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-col>
    </v-row>
</div>
</template>

<script setup lang="ts">

// import { useI18n } from 'vue-i18n'

import { ref } from 'vue'

// // Use i18n
// let { t } = useI18n({
//     inheritLocale: true,
//     useScope: 'global'
// })

let data: any = ref([30, 40, 35, 50, 49, 60, 70, 91])


const chartOptions = {
    chart: {
      id: "vuechart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
}

const series = ref([
  {
    name: "series-1",
    // data: [30, 40, 35, 50, 49, 60, 70, 91],
    data: data

  }
])

setInterval(() => {
  series.value[0].data = Array.from({length: 8}, () => Math.floor(Math.random() * 100))
  // console.log(data)
}, 3000)
    
</script>

<style scoped>

</style>