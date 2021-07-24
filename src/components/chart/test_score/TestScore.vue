<template>
  <div id="test__scores"></div>
</template>

<script>
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
// Initialize exporting module.
Exporting(Highcharts);

export default {
  name: "testScores",
  props: ["chartType"],
  data() {
    return {
      classPopulation: [
        {
          class: "Eng",
          population: 39,
        },
        {
          class: "Math",
          population: 78,
        },
        {
          class: "Econ",
          population: 56,
        },
        {
          class: "Bio",
          population: 60,
        },
        {
          class: "Phy",
          population: 89,
        },
        {
          class: "Lit",
          population: 35,
        },
        {
          class: "Eng",
          population: 39,
        },
        {
          class: "Math",
          population: 78,
        },
        {
          class: "Econ",
          population: 56,
        },
        {
          class: "Bio",
          population: 60,
        },
        {
          class: "Phy",
          population: 89,
        },
        {
          class: "Lit",
          population: 35,
        },
      ],
    };
  },
  computed: {
    classData() {
      let name = [];
      let population = [];
      if (this.classPopulation.length) {
        this.classPopulation.forEach((data) => {
          name.push(data.class);
          population.push(data.population);
        });
      }
      return { name, population };
    },
  },
  mounted() {
    this.setup();
  },
  watch: {
    classData() {
      this.setup();
    },
    chartType() {
      this.setup();
    },
  },
  methods: {
    setup(obj) {
      let { name, population } = this.classData;

      Highcharts.chart("test__scores", {
        chart: {
          type: this.chartType,
        },
        title: {
          text: "Latest Continous Assesment",
        },
        xAxis: {
          categories: name,
          gridLineColor: "transparent",
        },

        plotOptions: {
          series: {
            fillOpacity: 0.1,
          },
        },
        yAxis: {
          gridLineColor: "transparent",
          min: 0,
          max: 100,
          title: {
            text: "Scores",
          },
        },

        series: [
          {
            name: "Subjects",
            data: population,
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>