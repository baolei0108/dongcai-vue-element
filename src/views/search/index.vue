<template>
    <div>
      <input
      style=""
      :placeholder="placeholder"
      v-model="searchName"
      @input="changeSearch()">
      </input>

    </div>
</template>


<script>
export default {
  props: {
    //触发绑定的父组件事件
    searchEvent:{
      type:String
    },

    //动态传递此属性
    placeholder:{
      type:String,
      default:'输入名称搜索'
    }
  },


  data() {
    return {
      timer:'',
      searchName:''

    }
  },



  methods:{
    changeSearch() {

      //防抖
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit('selectFunc', this.searchName)
      }, 1000);

    }
  }
}
</script>

