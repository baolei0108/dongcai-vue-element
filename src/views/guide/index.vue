<template>
  <div class="app-container">
    <el-table
    :data="marketLists"
    style="width:96%;"
    class="mainTable">
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="createTime"
      :formatter="FunctionName">
    </el-table-column>
    <el-table-column
      label="更新时间"
      prop="updateTime"
      :formatter="FunctionName">
    </el-table-column>
    <el-table-column
      label="环境"
      prop="env">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查看详情</el-button> -->

        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)" class="modalDiaLog">编辑配置</el-button>


      </template>
    </el-table-column>
  </el-table>

   <!-- <div class="mask">
     <JsonEdit :value="value" v-if="showModal" @ok="handleOk" @cancel="handleCancel" class="jsonedit"></JsonEdit>

   </div> -->


   <el-dialog
  title="编辑"
  :visible.sync="showModal"
  width="50%"
  center>
  <JsonEdit :value="value" v-if="showModal" @ok="handleOk" @cancel="handleCancel" class="jsonedit"  @changed="changed" ></JsonEdit>
  <span slot="footer" class="dialog-footer">
    <el-button @click="showModal = false">取 消</el-button>
    <el-button type="primary" @click="showModal = false; submitData()">确 定</el-button>
  </span>
</el-dialog>




  </div>
</template>

<script>
import { fetchMarket, saveMarket } from '@/api/czqapi'

import JsonEdit from '@/views/JsonEdit'

export default {
  name: 'Guide',
  components:{
    JsonEdit
  },
  data() {
    return {
      marketLists:[],
      value: {
        data:[
          1,2,3
        ]

      },
      showModal: false,
      submitValue: '',
      row: {}

    }
  },
  created() {

    this.getData();

  },
  methods: {

    getData(){
      let query = ''
       fetchMarket(query).then( (res)=> {

        //  console.log(res);
        //  console.log(res.data)
        //  console.log(JSON.parse(res.data[0].config))

         if(res.data) {
           this.marketLists = res.data;
         }

      })

    },



     FunctionName(row, column) {
       const date = row[column.property]
       var str = date.substr(0,19).replace(/T/ig, ' ');


       return str;


    },


    handleEdit(index, row){
       this.row = row

      //  console.log(JSON.parse(row.config));

       if(row.config) {
         try{
             this.value = JSON.parse(row.config);
         }catch(e) {
             this.value = row.config;
         }

       }



      this.showModal = true;

    },

    handleOk(){
      this.showModal = false;
    },


    handleCancel(){
      this.showModal = false;
    },


    //编辑json之后返回的修改后的json数据
    changed(value) {
      //  console.log(value);

       this.submitValue = value;

    },


    submitData(){
      console.log('submitData');
      console.log(this.submitValue);
      console.log(this.row);


      if(this.submitValue) {
        var data = {
          id: this.row.id,
          env: this.row.env,
          createTime: this.row.createTime,
          updateTime: this.row.updateTime,
          config: this.submitValue
        }

        console.log(data);


        saveMarket(data).then( (res)=> {
          console.log(res);

        })



      }


      //每次提交之后 将this.submitValue 清空
      this.submitValue = '';



    }




  },

  mounted(){

  }
}
</script>



<style lang="scss" scoped>

.mask{
    /*background-color: #000; */
    opacity: 0.8;
    position: fixed;
    top: 141px;
    left: 217px;
    width: 100%;
    height: 80%;
    z-index: 1;
    width: 76%;

}

.jsonedit{
  width:100%;
  // height:400px
}



</style>
