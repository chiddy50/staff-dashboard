<template>
  <div id="test_scores_pie"></div>
</template>

<script>
import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

export default {
    name: 'pieChart',
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

        classData(){
            let chartData = []
            this.classPopulation.forEach(data => {
                chartData.push({
                    name: data.class,
                    y: data.population
                })
            })
            return chartData
        }
    },
    mounted(){
        this.setup()
    },
    watch: {
        classData(){
            this.setup()
        }
    },
    methods: {
        setup(obj){
        let data = this.classData
        Highcharts.chart('test_scores_pie', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Latest Continous Assesment'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Population',
                colorByPoint: true,
                data: data
            }]
        });
    }
    }
}
</script>

<style>

</style>