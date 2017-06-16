<script>
/*
{
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: [
        '#41B883',
        '#E46651',
        '#00D8FF',
        '#DD1B16'
      ],
      data: [40, 20, 80, 10]
    }
  ]
}
*/
import { Doughnut } from 'vue-chartjs'
export default Doughnut.extend({
  props: ['data', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options)
  }
})
</script>

<style>

</style>

