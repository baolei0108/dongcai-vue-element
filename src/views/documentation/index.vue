<template>
  <div class="tableBody">

  <el-table
    :data="tableData"
    style="width:96%;"
    class="mainTable">
    <el-table-column
      label="ip"
      prop="ip">
    </el-table-column>
    <el-table-column
      label="接口名称"
      prop="apiName">
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="createTime"
      :formatter="FunctionName">
    </el-table-column>
    <el-table-column
      label="环境"
      prop="env">
    </el-table-column>
    <el-table-column
      label="日志key"
      prop="logKey">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <!-- <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/> -->
         <search @selectFunc="selectFunc"></search>
      </template>
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查看详情</el-button> -->
        <el-popover
          placement="right"
          width=""
          trigger="click"
          class="logoMain">

          <div>
            <p>Api: {{detailTable.apiName || ''}}</p>
            <p>Total: {{detailTable.total}}</p>
            <p>Version: {{detailTable.version}}</p>


          <!-- <el-table :data="ResponseFields" class="ResponseFields">
            <el-table-column width="100" property="name" label="姓名"></el-table-column>
            <el-table-column width="300" property="type" label="类型"></el-table-column>
          </el-table> -->
          <div class="ResponseFields">
            <!-- <p>Table1:</p> -->
            <table>
            <thead>
              <tr >
                <th>字段名称</th>
                <th>数据类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="value in ResponseFields">
                <td>{{value.name}}</td>
                <td>{{value.type}}</td>
              </tr>

            </tbody>
          </table>


          </div>


          <div class="ResponsefileLists">
          <!-- <p>Table2:</p> -->
          <el-table :data="ResponsefileLists" >
            <!-- <el-table-column width="150" property="date" label="日期"></el-table-column> -->
            <el-table-column  property="StartTime" label="StartTime" :formatter="FunctionName"></el-table-column>
            <el-table-column  property="EndTime" label="EndTime" :formatter="FunctionName"></el-table-column>
            <el-table-column  property="count" label="count"></el-table-column>
            <el-table-column  property="url" label="url"></el-table-column>
            <el-table-column  property="Msg" label="Msg"></el-table-column>
          </el-table>
          </div>



           </div>

          <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">查看日志</el-button>
        </el-popover>


        <el-popover
          placement="right"
          width="400"
          height="400"
          style="overflow:auto"
          trigger="click">

           <el-table :data="MarketfieLists" class="ResponseFields" style="height:400px;overflow:auto">
            <el-table-column width="100" property="Market" label="市场"></el-table-column>
            <el-table-column width="300" property="Total" label="数量"></el-table-column>
          </el-table>

          <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">查看市场</el-button>
        </el-popover>

      </template>
    </el-table-column>
  </el-table>

  <!-- 模拟一个分页组件 -->

  <page :page-config="pageConfigTotal" @changeCurrentPage="changePage"></page>

  </div>
</template>


<script>

import { fetchList } from '@/api/czqapi'
import Page from '@/views/page/index'
import Search from '@/views/search/index'
//  :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"

export default {
  name: 'Documentation',
  components: {
    Page,
    Search
  },
  data() {
     return {
        searchList: ['草船借箭', '大富翁', '测试数据'],
        selectValue: {
          data: '1'
        },

        tableData: [],
        detailTable:[],
        ResponseFields:[],
        ResponsefileLists:[],
        MarketfieLists:[],
        search: '',
        total: 10,
        pageSize: 10,
        pageNo: 1,

        pageConfigTotal:{
          total: 10,
          pageSize: 10,
          pageNo: 1
        },


        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]



      }
  },


  methods:{
    getData(PageIndex, PageSize){
      var that = this;
      let query = {
        PageIndex: PageIndex,
        PageSize: PageSize
      }


      fetchList(query).then( (res)=> {

        if(res.total) {
          that.total = res.total;

          that.pageConfigTotal.total = that.total;

        }

         if(res.data) {
           this.tableData = res.data;
            console.log(res.data);

            res.data.map( value => {
               that.HandleData(value)


            })


         }



      })

    },

    DealTime() {
        return '00';
    },


    handleEdit(index, row) {
       this.HandleData(row)

    },


    handleDelete(){

    },



    HandleData(value) {
        var defaultValue = JSON.parse(value.logtxt);
        if(defaultValue.Response) {
            this.detailTable = defaultValue.Response;
            this.ResponseFields = defaultValue.Response.fields;
            this.ResponsefileLists = defaultValue.Response.fileList;
        }


        if(defaultValue.Descs) {
           this.MarketfieLists = JSON.parse(defaultValue.Descs);
          //  console.log(this.MarketfieLists);

        }


    },


    //分页组件返回的 回调函数
    changePage(value) {
      // console.log(value);
      this.pageNo = value;
      this.pageConfigTotal.pageNo = this.pageNo;
      this.getData(this.pageNo, this.pageSize);

    },


    FunctionName(row, column) {
       const date = row[column.property]
       var str = date.substr(0,19).replace(/T/ig, ' ');


       return str;


    },



    selectFunc(value) {
        // this.selectValue2 = value
        console.log(value)

    },



  },



  created() {
    // console.log(this.pageNo, this.pageSize);

    this.getData(this.pageNo, this.pageSize);

  }
}
</script>

<style lang="scss" scoped>
.tableBody{
  border:1px solid #DCDFE6;
  width: 100%;

}

.mainTable {

  table tr td{
    text-align: center;
  }

}

.documentation-container {
  margin: 50px;
  .document-btn {
    float: left;
    margin-left: 50px;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}


.ResponseFields{
    padding:20px 0;

    table, td, th {
      // border: 1px solid red;
    }

    thead {
      background-color: #f4f4f5;
      float: left;
      border-top: 1px solid #dfe6ec;
      border-left: 1px solid #dfe6ec;
      border-bottom: 1px solid #dfe6ec;
      height:45px;
    }
    thead th {
      display: block;
      // background: yellow;
    }

    tbody {
      float: left;
      height:45px;
      border-top: 1px solid #dfe6ec;
      border-bottom: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
    }
    tbody tr {
      display: block;
      float: left;
      text-align: center;
    }
    tbody td {
      display: block;
      width: 80px;
    }


}

.ResponsefileLists{

  border-top: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  margin:5px 0;
}


</style>
