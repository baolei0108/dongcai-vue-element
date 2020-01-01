<template>
    <div>
      <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <!-- <raddar-chart /> -->
          <chart :height="height" :chartData="chartData"/>
          <!-- 111 -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
           <chart  :chartData="chartData"/>
          <!-- 22 -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <!-- <bar-chart /> -->
          <chart  :chartData="chartData2"/>
          <!-- 33 -->
        </div>
      </el-col>
    </el-row>
    </div>
</template>


<script>
import chart from './chart'


export default {
  name:'',
  components:{
    chart
  },
  data(){
    return {
      height:'400px',
      chartData:{
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      },
      chartData2:{
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 40, name: 'Industries' },
              { value: 140, name: 'Technology' },
              { value: 249, name: 'Forex' },
              { value: 200, name: 'Gold' },
              { value: 359, name: 'Forecasts' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      }
    }
  }



}

</script>


<style lang="scss" scoped>

.chart-wrapper{
  border:1px solid red;
}
</style>
