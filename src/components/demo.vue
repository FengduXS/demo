<template>
  <div class="contentRight">
    <div class="main">
      <div class="formOperater">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="所属单位:">
            <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
              <el-option label="国网山东综合能源服务有限公司" value="shanghai"></el-option>
              <el-option label="济南分中心" value="beijing"></el-option>
              <el-option label="烟台分中心" value="beijing"></el-option>
              <el-option label="青岛分中心" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户编号:">
            <el-input v-model="mainUpForm.number"></el-input>
          </el-form-item>
          <el-form-item label="客户名称:">
            <el-input v-model="mainUpForm.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" class="demo-form-inline">
          <el-button type="primary" class="search" @click="queryMainTable()">查询</el-button>
          <span class="unfold" @click.stop="openSearch()">展开</span><i :class="unfold?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </el-form>
      </div>
      <el-form :inline="true" class="demo-form-inline" v-if="unfold">
        <el-form-item label="行业类别:">
          <el-select  placeholder="请选择行业类别" v-model="mainDownForm.industryType">
            <el-option label="石化" value="shanghai"></el-option>
            <el-option label="交通" value="beijing"></el-option>
            <el-option label="钢铁" value="shanghai"></el-option>
            <el-option label="商业" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="洽谈状态:">
          <el-select  placeholder="请选择洽谈状态" v-model="mainDownForm.status">
            <el-option label="待洽谈" value="shanghai"></el-option>
            <el-option label="洽谈中" value="beijing"></el-option>
            <el-option label="洽谈关闭" value="beijing"></el-option>
            <el-option label="洽谈成功" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table
        :data="mainTableData"
        style="width: 100%;height: 80%;">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="orgNo"
          label="所属单位">
        </el-table-column>
        <el-table-column
          prop="consNo"
          label="客户编号">
        </el-table-column>
        <el-table-column
          prop="consName"
          label="客户名称">
        </el-table-column>
        <el-table-column
          prop="elecAddr"
          label="客户地址">
        </el-table-column>
        <el-table-column
          prop="tradeCate"
          label="行业类别">
        </el-table-column>
        <el-table-column
          prop="contractCap"
          label="合同容量kVA">
        </el-table-column>
        <el-table-column
          prop="discStatus"
          label="洽谈状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <img src="../assets/img/u430.png" width="16px" height="16px" @click="openFirst()">
            <img src="../assets/img/u429.png" width="16px" height="16px" @click="openSecond()">
            <img src="../assets/img/u431.png" width="16px" height="16px" @click="openThird()">
            <img src="../assets/img/u428.png" width="16px" height="16px" @click="openForth()">
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom">
        <span class="bottomDetail">当前1-9条记录，共{{mainTotal}}条记录</span>
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :current-page="mainPage"
          :total="mainTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 需求调研 -->
    <slide-panel :show="firstPanel" :size="'70%'" :leval="2" @closePanel="firstPanel = false">
      <el-card>
        <el-tabs v-model="firstPanelTab">
          <el-tab-pane label="客户信息" name="first">
            <div class="ctitle">
              <div class="leftIcon"></div>
              <span>基本信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form label-position="right" label-width="200px">
                  <el-form-item label="客户编号:">
                    <el-input><template slot="append"><img src="../assets/img/u4487.png" @click="openCusomerNumber()"></template></el-input>
                  </el-form-item>
                  <el-form-item label="客户名称：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="客户地址">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="联系人：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="用电类别：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="行业分类：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="近12个月功率因数不合格月份数：">
                    <el-input></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-position="right" label-width="240px">
                  <el-form-item label="四大领域:">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="行业类别：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="供电电压等级：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="合同容量（kVA）：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="运行容量（kVA）：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="是否直接交易：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="是否欠费：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="近12个月功率因数不合格月份力调电费：">
                    <el-input></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <div class="ctitle">
              <div class="leftIcon"></div>
              <span>园区信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form label-position="right" label-width="240px">
                  <el-form-item label="所属园区：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="建筑总面积：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="营业总面积：">
                    <el-input></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-position="right" label-width="240px">
                  <el-form-item label="园区级别:">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="建筑类别：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="总人数：">
                    <el-input></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <div class="ctitle">
              <div class="leftIcon"></div>
              <span>其他</span>
            </div>
            <el-form label-position="right" label-width="240px" :inline="true">
                  <el-form-item label="客户关系信息:">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="主要产品流向：">
                    <el-input></el-input>
                  </el-form-item>
            </el-form>
            <div class="bottomBotton">
                  <el-button >取消</el-button>
                  <el-button type="primary">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="变压器信息" name="second">
            <div class="ctitle">
              <div class="leftIcon"></div>
              <span style="margin-right: 80%;">变压器信息</span>
              <i class="el-icon-plus" style="margin-right:20px" @click="openAddTransformerPanel()"></i>
              <i class="el-icon-minus"></i>
            </div>
            <el-table style="width: 100%;">
              <el-table-column
                prop="index"
                label="序号"
                >
              </el-table-column>
              <el-table-column
                prop="type"
                label="变压器型号"
                >
              </el-table-column>
              <el-table-column
                prop="content"
                label="容量(kV)"
                >
              </el-table-column>
              <el-table-column
                prop="number"
                label="数量"
                >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="能源消息信息" name="third">
            <el-tabs v-model="firstPanelEnergyTab">
              <el-tab-pane label="主要能源" name="first">
                <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>主要能源消费信息</span>
                </div>
                <span class="spa">类别</span>
                <span class="spb">年用量</span>
                <span class="sp">计量单位</span>
                <span class="sp">年能源成本(元)</span>
                <span class="sp">是否精确计量</span>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="煤炭:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="煤炭:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="水:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="汽/柴油:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="天然气:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="电:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="外购热水:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="外购蒸汽:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="其它:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>主要能源消费信息</span>
                </div>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="年合计能源成本（万元）：" label-width="180px">
                      <el-input></el-input>
                    </el-form-item>
                </el-form>
                <div class="bottomBotton">
                  <el-button >取消</el-button>
                  <el-button type="primary">保存</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="飞机停靠用能" name="second">
                <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span style="margin-right:80%">飞机停靠用能信息</span>
                  <i class="el-icon-plus" style="margin-right:20px" @click="openAddAirEnergyPanel"></i>
                  <i class="el-icon-minus"></i>
                </div>
                <el-table style="width: 100%;">
                    <el-table-column
                      prop="index"
                      label="廊桥总数量"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="实施桥载设备替代APU的廊桥信息"
                      >
                      <el-table-column
                        prop="type"
                        label="廊桥数量"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="type"
                        label="年停靠飞机数量（架次）"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="未实施桥载设备替代APU的廊桥信息"
                      >
                      <el-table-column
                        prop="type"
                        label="廊桥数量"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="type"
                        label="年停靠飞机数量（架次）"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="type"
                        label="年耗能量(航空燃油/吨)"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="是否有新建或改造计划"
                      >
                    </el-table-column>
                  </el-table>
              </el-tab-pane>
              <el-tab-pane label="船舶停靠用能" name="third">
                <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span style="margin-right:80%">船舶停靠用能信息</span>
                  <i class="el-icon-plus" style="margin-right:20px" @click="openAddShipEnergyPanel"></i>
                  <i class="el-icon-minus"></i>
                </div>
                <el-table style="width: 100%;">
                    <el-table-column
                      prop="index"
                      label="港口类别"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="码头类别"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="泊位数量"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      >
                      <el-table-column
                        prop="content"
                        label="岸电数量"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="已有岸电设施信息"
                      >
                      <el-table-column
                        prop="content"
                        label="岸电单体容量"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="content"
                        label="年使用数量（艘次）"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="无岸电设施泊位数量"
                      >
                      <el-table-column
                        prop="content"
                        label="泊位数量"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="content"
                        label="单体岸电容量需求"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="是否有新建或改造计划"
                        >
                      </el-table-column>
                  </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="设备资产信息" name="forth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>能源消费明细</span>
            </div>
            <el-table
              style="width: 100%;">
              <el-table-column
                prop="status"
                label="主要能源用途及其系统" 
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="用能设备"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="能源品种"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="型号规格"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="用能参数"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="设备数量"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="使用年限"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="年利用小时数"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="年耗能量(参考)">
                  <el-table-column
                  prop="status"
                  label="数值"
                  align="center">
                  </el-table-column>
                  <el-table-column
                  prop="status"
                  label="单位"
                  align="center">
                  </el-table-column>
              </el-table-column>  
              <el-table-column
                prop="status"
                label="是否有节能意向"
                align="center">
              </el-table-column> 
              <el-table-column
                prop="status"
                label="是否有更换意向"
                align="center">
              </el-table-column> 
            </el-table>
            <el-button type="primary" style="margin-left:80%;" @click="openAssetsChangePanel()">新增</el-button>
            <el-button type="primary" @click="openAssetsChangePanel()">修改</el-button>
            <el-button type="primary">删除</el-button>
          </el-tab-pane>
          <el-tab-pane label="现场走访信息" name="fifth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>走访信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form label-width="90px" label-position="right">
                  <el-form-item label="能源平台系统:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已建"></el-radio>
                      <el-radio label="未建"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="光伏:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已建"></el-radio>
                      <el-radio label="未建"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="储能:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已建"></el-radio>
                          <el-radio label="未建"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">MW</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="天然气三联供:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已建"></el-radio>
                          <el-radio label="未建"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">MW</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="蓄冷热:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已建"></el-radio>
                          <el-radio label="未建"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">MW</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="充电桩:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已建"></el-radio>
                          <el-radio label="未建"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">MW</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="电采暖:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已建"></el-radio>
                      <el-radio label="未建"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="外墙保温:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已建"></el-radio>
                      <el-radio label="未建"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="市场化售电:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已参与"></el-radio>
                          <el-radio label="未参与"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                        <el-input placeholder="请输入内容">
                        </el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="电力需求响应:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已参与"></el-radio>
                      <el-radio label="未参与"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="照明节能改造:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已实施"></el-radio>
                      <el-radio label="未实施"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="空调群控:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已实施"></el-radio>
                      <el-radio label="未实施"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="130px" label-position="right">
                  <el-form-item label="是否有意向新建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">m²</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向参与:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向参与:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-form  label-position="right">
                  <el-form-item label="主要能源管理措施:" label-width="10%">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="补充说明:" label-width="10%">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
            </el-form>
            <div class="bottomBotton">
              <el-button >取消</el-button>
              <el-button type="primary">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="客户意愿" name="sixth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>有意愿更换的设备</span>
            </div>
              <el-table style="width: 100%;">
                  <el-table-column
                    prop="index"
                    label="主要能源用途及其系统"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="主要用能设备"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="能源品种"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="型号规格"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="主要用能参数"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="更换数量"
                    >
                  </el-table-column>
                </el-table>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>有意愿改造的设备</span>
            </div>
            <el-table style="width: 100%;">
                  <el-table-column
                    prop="index"
                    label="主要能源用途及其系统"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="主要用能设备"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="能源品种"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="型号规格"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="主要用能参数"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="改造数量"
                    >
                  </el-table-column>
            </el-table>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>有意愿开展的业务</span>
            </div>
            <el-input type="textarea" :rows="6"></el-input>
          </el-tab-pane>
          <el-tab-pane label="项目建议" name="seventh">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>综合能源服务业务潜力信息</span>
            </div>
            <el-form label-width="170px" label-position="right">
                  <el-form-item label="是否建议开展节能改造:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="14">
                        <el-checkbox-group v-model="type">
                          <el-checkbox label="供冷热系统改造" name="type"></el-checkbox>
                          <el-checkbox label="照明节能改造" name="type"></el-checkbox>
                          <el-checkbox label="电机节能改造" name="type"></el-checkbox>
                          <el-checkbox label="其他" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="是否建议开展分布式能源建设:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="14">
                        <el-checkbox-group v-model="type">
                          <el-checkbox label="光伏" name="type"></el-checkbox>
                          <el-checkbox label="风电" name="type"></el-checkbox>
                          <el-checkbox label="生物质发电" name="type"></el-checkbox>
                          <el-checkbox label="三联供" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="是否建议利用余热余压:">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展蓄冷热:">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展变配电设备改造:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展充电桩建设:">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展储能建设:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展能效提升:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议建设能源平台系统:">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议参与市场化售电:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展电力需求响应:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>电能替代潜力信息</span>
            </div>
            <el-form label-width="170px" label-position="right">
              <el-form-item label="是否建议开展电能替代:">
                    <el-row>
                      <el-col :span="8">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="16">
                        <el-checkbox-group v-model="type">
                          <el-checkbox label="电锅炉" name="type"></el-checkbox>
                          <el-checkbox label="热泵" name="type"></el-checkbox>
                          <el-checkbox label="电窑炉" name="type"></el-checkbox>
                          <el-checkbox label="冶金电炉" name="type"></el-checkbox>
                          <el-checkbox label="电动汽车" name="type"></el-checkbox>
                          <el-checkbox label="分散电采暖" name="type"></el-checkbox>
                          <el-checkbox label="农业辅助生产及农产品加工" name="type"></el-checkbox>
                          <el-checkbox label="机场、港口岸" name="type"></el-checkbox>
                          <el-checkbox label="其他" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-row>
              </el-form-item>
            </el-form>
            <div class="bottomBotton">
                  <el-button >取消</el-button>
                  <el-button type="primary">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="调研资料" name="eighth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>调研资料信息</span>
            </div>
            <el-table style="width: 100%;" :data="investigateData">
              <el-table-column
                type="selection"
                >
              </el-table-column>
              <el-table-column
                prop="type"
                label="资料名称"
                >
              </el-table-column>
              <el-table-column
                prop="content"
                label="资料类型"
                >
              </el-table-column>
              <el-table-column
                prop="number"
                label="上传日期"
                >
              </el-table-column>
              <el-table-column
                prop="number"
                label="操作"
                >
                <template>
                  <img src="../assets/img/u3681.png" width="16px" height="16px" >
                  <img src="../assets/img/u3682.png" width="16px" height="16px" @click="openSurveyModifyPanel()">
                  <img src="../assets/img/u374.png"  width="16px" height="16px" @click="openSurveyDetail()">
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 90%;">删除</el-button>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>调研资料上传</span>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="资料名称:">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="资料类型:">
                <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                  <el-option label="机构一" value="shanghai"></el-option>
                  <el-option label="机构二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form>
              <el-form-item label="附件信息:" label-width="80px">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    multiple>
                    <el-button size="small" plain><i class="el-icon-upload2"></i>上传文件</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
            <div class="uploadList">
              <span>关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span class="uploadOperate">上传</span>
              <el-progress :percentage="20" :stroke-width="3" style="width:440px;"></el-progress>
              <span>关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span class="uploadOperate">取消</span>
              <el-progress :percentage="20" :stroke-width="3" style="width:440px;"></el-progress>
            </div>
            <el-button type="primary" style="margin-left: 90%;">保存</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </slide-panel>
    <!-- 客户编号选择 -->
    <slide-panel :show="customerNumberPanel" :size="'50%'" :leval="3" @closePanel="customerNumberPanel = false">
      <el-card>
        <el-table style="width: 100%;height: 410px;">
                <el-table-column
                  type="selection">
                </el-table-column>
                <el-table-column
                  prop="index"
                  label="客户编号">
                </el-table-column>
                <el-table-column
                  prop="index"
                  label="所属单位">
                </el-table-column>
                <el-table-column
                  prop="index"
                  label="客户名称">
                </el-table-column>
              </el-table>
      </el-card>
    </slide-panel>
    <!-- 添加变压器信息 -->
    <slide-panel :show="addTransformerPanel" :size="'50%'" :leval="3" @closePanel="addTransformerPanel = false">
      <el-card>
        
      </el-card>
    </slide-panel>
    <!-- 飞机停靠用能添加 -->
    <slide-panel :show="addAirEnergy" :size="'50%'" :leval="3" @closePanel="addAirEnergy = false">
      <el-card>
        <div slot="header" class="clearfix">
          <span>飞机停靠用能</span>
        </div>
        <el-form label-position="right">
          <el-form-item label="廊桥总数量:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="廊桥数量:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="年停靠飞机数量（架次）:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="廊桥数量:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="年停靠飞机数量（架次）:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="年耗能量(航空燃油/吨):" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否有新建或改造计划:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addAirEnergy = false" style="margin-left: 400px">保存</el-button>
      </el-card>
    </slide-panel>
    <!-- 船舶停靠用能添加 -->
    <slide-panel :show="addShipEnergy" :size="'50%'" :leval="2" @closePanel="addShipEnergy = false">
      <el-card>
        <div slot="header" class="clearfix">
          <span>船舶停靠用能</span>
        </div>
        <el-form label-position="right">
          <el-form-item label="港口类别:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="码头类别:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="泊位数量:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="岸电数量:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="岸电单体容量:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="年使用数量（艘次）:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="泊位数量:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="单体岸电容量需求:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否有新建或改造计划:" label-width="200px">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addShipEnergy = false" style="margin-left: 400px">保存</el-button>
      </el-card>
    </slide-panel>
    <!-- 资产信息新增修改 -->
    <slide-panel :show="assetsChange" :size="'50%'" :leval="2" @closePanel="assetsChange = false">
      <el-card>
        <div slot="header" class="clearfix">
                <span>详情</span>
              </div>
              <div class="ctitle">
                <div class="leftIcon"></div>
                <span>能源消费明细</span>
              </div>
              <el-form label-position="right">
                <el-form-item label="主要能源用途及其系统:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="用能设备:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="能源品种:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="型号规格:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="用能参数:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="设备数量:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="使用年限:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="年利用小时数:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="数值:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="单位:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="是否有节能意向:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="是否有更换意向:" label-width="200px">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" style="margin-left: 400px;" @click="assetsChange = false">保存</el-button>
      </el-card>
    </slide-panel>
    <!-- 调研资料修改 -->
    <slide-panel :show="surveyModifyPanel" :size="'50%'" :leval="3" @closePanel="surveyModifyPanel = false">
      <el-card>
          <el-form>
            <el-form-item label="资料名称:" label-width="80px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="资料类型:" label-width="80px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="上传日期:" label-width="80px">
              <el-input></el-input>
            </el-form-item>
          </el-form>
      </el-card>
    </slide-panel>
    <!-- 调研资料详情 -->
    <slide-panel :show="surveyDetailPanel" :size="'50%'" :leval="3" @closePanel="surveyDetailPanel = false">
      <el-card>
        <el-form>
          <el-form-item label="资料名称:" label-width="10%">
          </el-form-item>
          <el-form-item label="资料资料:" label-width="10%">
          </el-form-item>
          <el-form-item label="上传日期:" label-width="10%">
          </el-form-item>
          <el-form-item label="附件信息:" label-width="10%">
          </el-form-item>
        </el-form>
      </el-card>
    </slide-panel>

    <!-- 方案定制 -->
    <slide-panel :show="secondPanel" :size="'70%'" :leval="2" @closePanel="secondPanel = false">
      <el-card>
        <div slot="header" class="clearfix">
          <span>服务方案信息</span>
        </div>
        <div class="ctitle">
          <div class="leftIcon"></div>
          <span>服务方案信息</span>
        </div>
        <el-table
          style="width: 100%;"
          :data="secondPanelTable">
          <el-table-column
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column
            prop="index"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="department"
            label="方案名称">
          </el-table-column>
          <el-table-column
            prop="customerNumber"
            label="利润率">
          </el-table-column>
          <el-table-column
            prop="name"
            label="方案版本号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="编制人">
          </el-table-column>
          <el-table-column
            prop="industryType"
            label="编制单位">
          </el-table-column>
          <el-table-column
            prop="contract"
            label="编制日期">
          </el-table-column>
          <el-table-column
            label="操作">
            <template>
              <img src="../assets/img/u3681.png" width="16px" height="16px">
              <img src="../assets/img/u3682.png" width="16px" height="16px" @click="openPlanModify()">
              <img src="../assets/img/u374.png" width="16px" height="16px" @click="openPlanDetail()">
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-left: 800px;">删除</el-button>
      </el-card>
    </slide-panel>
    <!-- 方案修改 -->
    <slide-panel :show="planMoifyPanel" :size="'50%'" :leval="3" @closePanel="planMoifyPanel = false">
      <el-card>
        <div slot="header" class="clearfix">
            <span>详情</span>
          </div>
          <div class="ctitle">
            <div class="leftIcon"></div>
            <span>服务方案维护</span>
          </div>
          <el-form :inline="true" >
            <el-form-item label="方案名称：" label-width="100px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="利润率：" label-width="100px">
              <el-input></el-input>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="方案主要内容：" label-width="100px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="技术经济优势：" label-width="100px">
              <el-input></el-input>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item>
              <el-form :inline="true" >
                <el-form-item label="编制单位：" label-width="100px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="编制人：" label-width="100px">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item>
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="编制日期：" label-width="90px">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="方案版本：" label-width="100px">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="附件信息:" label-width="70px">
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :auto-upload="false"
                  multiple>
                  <el-button size="small" plain><i class="el-icon-upload2"></i>上传文件</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div class="uploadList">
            <span>关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span class="uploadOperate">上传</span>
            <el-progress :percentage="20" :stroke-width="3" style="width:440px;"></el-progress>
            <span>关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span class="uploadOperate">取消</span>
            <el-progress :percentage="20" :stroke-width="3" style="width:440px;"></el-progress>
          </div>
      </el-card>
    </slide-panel>
    <!-- 方案详情 -->
    <slide-panel :show="planDetailPanel" :size="'50%'" :leval="3" @closePanel="planDetailPanel = false">
      <el-card>
        <div slot="header" class="clearfix">
          <span>详情</span>
        </div>
      </el-card>
    </slide-panel>

    <!-- 意向洽谈 -->
    <slide-panel :show="thirdPanel" :size="'70%'" :leval="2" @closePanel="thirdPanel = false">
      <el-card>
        <el-tabs v-model="thirdPanelTab">
                <el-tab-pane label="洽谈记录维护" name="first">
                  <div class="ctitle">
                    <div class="leftIcon"></div>
                    <span>洽谈记录维护</span>
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <el-form label-position="right" label-width="200px">
                        <el-form-item label="客户联系人:">
                          <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="客户意愿：">
                          <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                            <el-option label="机构一" value="shanghai"></el-option>
                            <el-option label="机构二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="潜在供应商：">
                          <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="洽谈日期：">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="客户需求描述：">
                          <el-input type="textarea"></el-input>
                        </el-form-item>
                      </el-form>
                    </el-col>
                    <el-col :span="12">
                      <el-form label-position="right" label-width="240px">
                        <el-form-item label="联系电话:">
                          <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="商务模式：">
                          <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                            <el-option label="机构一" value="shanghai"></el-option>
                            <el-option label="机构二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="洽谈责任人：">
                          <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="洽谈状态：">
                          <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                            <el-option label="机构一" value="shanghai"></el-option>
                            <el-option label="机构二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="洽谈过程描述：">
                          <el-input type="textarea"></el-input>
                        </el-form-item>
                      </el-form>
                    </el-col>
                  </el-row>
                  <el-form>
                    <el-form-item label="附件信息:" label-width="70px">
                      <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :auto-upload="false"
                          multiple>
                          <el-button size="small" plain><i class="el-icon-upload2"></i>上传文件</el-button>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <div class="uploadList">
                    <span>关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span class="uploadOperate">上传</span>
                    <el-progress :percentage="20" :stroke-width="3" style="width:440px;"></el-progress>
                    <span>关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span class="uploadOperate">取消</span>
                    <el-progress :percentage="20" :stroke-width="3" style="width:440px;"></el-progress>
                  </div>
                  <div class="bottomBotton">
                    <el-button type="primary">保存</el-button>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="洽谈记录信息" name="second">
                  <div class="ctitle">
                    <div class="leftIcon"></div>
                    <span>洽谈记录信息</span>
                  </div>
                  <el-table style="width: 100%;" :data="thirdPanelRecordTable">
                    <el-table-column
                      prop="index"
                      label="序号"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="客户联系人"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="联系电话"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="客户意愿"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="商务模式"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="潜在供应商"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="洽谈责任人"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="洽谈日期"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="洽谈状态"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="操作"
                      >
                      <template>
                        <img src="../assets/img/u3681.png" width="16px" height="16px">
                        <img src="../assets/img/u3682.png" width="16px" height="16px" @click="openTalkRecordModify()">
                        <img src="../assets/img/u374.png" width="16px" height="16px" @click="openTalkRecordDetail()">
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button type="primary" style="margin-left: 800px;">删除</el-button>
                </el-tab-pane>
                <el-tab-pane label="客户标签设置" name="third">
                  <div class="ctitle">
                    <div class="leftIcon"></div>
                    <span>客户自然信息</span>
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <el-form>
                        <el-form-item label="客户编号:" label-width="120px">
                          00000
                        </el-form-item>
                        <el-form-item label="客户类型:" label-width="120px">
                          工业企业
                        </el-form-item>
                        <el-form-item label="行业分类:" label-width="120px">
                          石化
                        </el-form-item>
                        <el-form-item label="注册地址:" label-width="120px">
                          济南市100号
                        </el-form-item>
                        <el-form-item label="管理单位:" label-width="120px">
                          无
                        </el-form-item>
                        <el-form-item label="年产值（万元）:" label-width="120px">
                          100000
                        </el-form-item>
                      </el-form>
                    </el-col>
                    <el-col :span="12">
                      <el-form>
                        <el-form-item label="客户名称:" label-width="120px">
                          济南石化集团
                        </el-form-item>
                        <el-form-item label="行政区域:" label-width="120px">
                          济南市
                        </el-form-item>
                        <el-form-item label="注册资金（万元）:" label-width="120px">
                          10000
                        </el-form-item>
                        <el-form-item label="经营地址:" label-width="120px">
                          济南市100号
                        </el-form-item>
                        <el-form-item label="控股单位:" label-width="120px">
                          无
                        </el-form-item>
                        <el-form-item label="社会统一信用代码:" label-width="120px">
                          888888888888
                        </el-form-item>
                      </el-form>
                    </el-col>
                  </el-row>
                  <el-form>
                    <el-form-item label="企业简介:" label-width="120px">
                          济南石化集团
                    </el-form-item>
                  </el-form>
                  <div class="ctitle">
                    <div class="leftIcon"></div>
                    <span>客户标签设置</span>
                  </div>
                  <div class="tags">
                    <div class="tagDetail">用电客户√</div>
                    <div class="tagDetail">高能耗企业√</div>
                    <div class="tagDetail">潜力巨大</div>
                    <div class="tagDetail">潜力巨大√</div>
                    <div class="tagDetailb">.....</div>
                    <div class="tagDetailb">.....</div>
                  </div>
                  <el-button type="primary" style="margin-left: 800px;">保存</el-button>
                </el-tab-pane>
              </el-tabs>
      </el-card>
    </slide-panel>
    <!-- 洽谈记录修改 -->
    <slide-panel :show="talkRecordModifyPanel" :size="'50%'" :leval="3" @closePanel="talkRecordModifyPanel = false">
      <el-card>
        <div slot="header" class="clearfix">
          <span>详情</span>
        </div>
        <div class="ctitle">
          <div class="leftIcon"></div>
          <span>洽谈记录信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form label-position="right" label-width="200px">
              <el-form-item label="客户联系人:">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="客户意愿：">
                <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                  <el-option label="机构一" value="shanghai"></el-option>
                  <el-option label="机构二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="潜在供应商：">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="洽谈日期：">
                <el-date-picker
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="客户需求描述：">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form label-position="right" label-width="240px">
              <el-form-item label="联系电话:">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="商务模式：">
                <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                  <el-option label="机构一" value="shanghai"></el-option>
                  <el-option label="机构二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="洽谈责任人：">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="洽谈状态：">
                <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                  <el-option label="机构一" value="shanghai"></el-option>
                  <el-option label="机构二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="洽谈过程描述：">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-form>
          <el-form-item label="附件信息:" label-width="70px">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                multiple>
                <el-button size="small" plain><i class="el-icon-upload2"></i>上传文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="uploadList">
          <span>关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span class="uploadOperate">上传</span>
          <el-progress :percentage="20" :stroke-width="3" style="width:440px;"></el-progress>
          <span>关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span class="uploadOperate">取消</span>
          <el-progress :percentage="20" :stroke-width="3" style="width:440px;"></el-progress>
        </div>
        <div class="bottomBotton">
          <el-button type="primary">保存</el-button>
        </div>
      </el-card>
    </slide-panel>
    <!-- 洽谈记录详情 -->
    <slide-panel :show="talkRecordDetailPanel" :size="'50%'" :leval="3" @closePanel="talkRecordDetailPanel = false">
      <el-card>
        <div slot="header" class="clearfix">
          <span>详情</span>
        </div>
      </el-card>
    </slide-panel>

    <!-- 潜力客户信息 -->
    <slide-panel :show="forthPanel" :size="'70%'" :leval="2" @closePanel="forthPanel = false">
      <el-card>
        <el-tabs v-model="forthPanelTab">
          <el-tab-pane label="客户信息" name="first">
            <div class="ctitle">
              <div class="leftIcon"></div>
              <span>基本信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form label-position="right" label-width="200px">
                  <el-form-item label="客户编号:">
                    372019051234
                  </el-form-item>
                  <el-form-item label="客户名称：">
                    张三
                  </el-form-item>
                  <el-form-item label="客户地址">
                    山东省济南市中区XXX路XXX号
                  </el-form-item>
                  <el-form-item label="联系人：">
                    张三
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    13912345678
                  </el-form-item>
                  <el-form-item label="用电类别：">
                    大工业用电
                  </el-form-item>
                  <el-form-item label="行业分类：">
                    平板玻璃制造
                  </el-form-item>
                  <el-form-item label="近12个月功率因数不合格月份数：">
                    0
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-position="right" label-width="240px">
                  <el-form-item label="四大领域:">
                    工业
                  </el-form-item>
                  <el-form-item label="行业类别：">
                    工业
                  </el-form-item>
                  <el-form-item label="供电电压等级：">
                    220
                  </el-form-item>
                  <el-form-item label="合同容量（kVA）：">
                    250000
                  </el-form-item>
                  <el-form-item label="运行容量（kVA）：">
                    250000
                  </el-form-item>
                  <el-form-item label="是否直接交易：">
                    否
                  </el-form-item>
                  <el-form-item label="是否欠费：">
                    否
                  </el-form-item>
                  <el-form-item label="近12个月功率因数不合格月份力调电费：">
                    0
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <div class="ctitle">
              <div class="leftIcon"></div>
              <span>园区信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form label-position="right" label-width="240px">
                  <el-form-item label="所属园区：">
                    XX工业园区
                  </el-form-item>
                  <el-form-item label="建筑总面积：">
                    320000
                  </el-form-item>
                  <el-form-item label="营业总面积：">
                    
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-position="right" label-width="240px">
                  <el-form-item label="园区级别:">
                    省级
                  </el-form-item>
                  <el-form-item label="建筑类别：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="总人数：">
                    2000
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <div class="ctitle">
              <div class="leftIcon"></div>
              <span>其他</span>
            </div>
            <el-form label-position="right" label-width="240px" :inline="true">
                  <el-form-item label="客户关系信息:">
                    上下级关系
                  </el-form-item>
                  <el-form-item label="主要产品流向：">
                    美国，欧盟
                  </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="变压器信息" name="second">
            <div class="ctitle">
              <div class="leftIcon"></div>
              <span>变压器信息</span>
            </div>
            <el-table style="width: 100%;">
              <el-table-column
                prop="index"
                label="序号"
                >
              </el-table-column>
              <el-table-column
                prop="type"
                label="变压器型号"
                >
              </el-table-column>
              <el-table-column
                prop="content"
                label="容量(kV)"
                >
              </el-table-column>
              <el-table-column
                prop="number"
                label="数量"
                >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="能源消息信息" name="third">
            <el-tabs v-model="forthPanelEnergyTab">
              <el-tab-pane label="主要能源" name="first">
                <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>主要能源消费信息</span>
                </div>
                <span class="spa">类别</span>
                <span class="spb">年用量</span>
                <span class="sp">计量单位</span>
                <span class="sp">年能源成本(元)</span>
                <span class="sp">是否精确计量</span>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="煤炭:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="煤炭:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="水:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="汽/柴油:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="天然气:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="电:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="外购热水:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="外购蒸汽:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="其它:" label-width="70px">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  placeholder="请选择机构" v-model="mainUpForm.department">
                      <el-option label="机构一" value="shanghai"></el-option>
                      <el-option label="机构二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>主要能源消费信息</span>
                </div>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="年合计能源成本（万元）：" label-width="180px">
                      <el-input></el-input>
                    </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="飞机停靠用能" name="second">
                <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>飞机停靠用能信息</span>
                </div>
                <el-table style="width: 100%;">
                    <el-table-column
                      prop="index"
                      label="廊桥总数量"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="实施桥载设备替代APU的廊桥信息"
                      >
                      <el-table-column
                        prop="type"
                        label="廊桥数量"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="type"
                        label="年停靠飞机数量（架次）"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="未实施桥载设备替代APU的廊桥信息"
                      >
                      <el-table-column
                        prop="type"
                        label="廊桥数量"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="type"
                        label="年停靠飞机数量（架次）"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="type"
                        label="年耗能量(航空燃油/吨)"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="是否有新建或改造计划"
                      >
                    </el-table-column>
                  </el-table>
              </el-tab-pane>
              <el-tab-pane label="船舶停靠用能" name="third">
                <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>船舶停靠用能信息</span>
                </div>
                <el-table style="width: 100%;">
                    <el-table-column
                      prop="index"
                      label="港口类别"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="码头类别"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="泊位数量"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      >
                      <el-table-column
                        prop="content"
                        label="岸电数量"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="已有岸电设施信息"
                      >
                      <el-table-column
                        prop="content"
                        label="岸电单体容量"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="content"
                        label="年使用数量（艘次）"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="无岸电设施泊位数量"
                      >
                      <el-table-column
                        prop="content"
                        label="泊位数量"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="content"
                        label="单体岸电容量需求"
                        >
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="是否有新建或改造计划"
                        >
                      </el-table-column>
                  </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="设备资产信息" name="forth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>能源消费明细</span>
            </div>
            <el-table
              style="width: 100%;">
              <el-table-column
                prop="status"
                label="主要能源用途及其系统" 
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="用能设备"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="能源品种"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="型号规格"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="用能参数"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="设备数量"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="使用年限"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="年利用小时数"
                align="center">
              </el-table-column>
              <el-table-column
                prop="status"
                label="年耗能量(参考)">
                  <el-table-column
                  prop="status"
                  label="数值"
                  align="center">
                  </el-table-column>
                  <el-table-column
                  prop="status"
                  label="单位"
                  align="center">
                  </el-table-column>
              </el-table-column>  
              <el-table-column
                prop="status"
                label="是否有节能意向"
                align="center">
              </el-table-column> 
              <el-table-column
                prop="status"
                label="是否有更换意向"
                align="center">
              </el-table-column> 
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="现场走访信息" name="fifth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>走访信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form label-width="90px" label-position="right">
                  <el-form-item label="能源平台系统:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已建"></el-radio>
                      <el-radio label="未建"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="光伏:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已建"></el-radio>
                      <el-radio label="未建"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="储能:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已建"></el-radio>
                          <el-radio label="未建"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">MW</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="天然气三联供:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已建"></el-radio>
                          <el-radio label="未建"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">MW</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="蓄冷热:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已建"></el-radio>
                          <el-radio label="未建"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">MW</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="充电桩:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已建"></el-radio>
                          <el-radio label="未建"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">MW</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="电采暖:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已建"></el-radio>
                      <el-radio label="未建"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="外墙保温:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已建"></el-radio>
                      <el-radio label="未建"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="市场化售电:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="已参与"></el-radio>
                          <el-radio label="未参与"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                        <el-input placeholder="请输入内容">
                        </el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="电力需求响应:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已参与"></el-radio>
                      <el-radio label="未参与"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="照明节能改造:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已实施"></el-radio>
                      <el-radio label="未实施"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="空调群控:">
                    <el-radio-group v-model="resource">
                      <el-radio label="已实施"></el-radio>
                      <el-radio label="未实施"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="130px" label-position="right">
                  <el-form-item label="是否有意向新建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                      <el-input placeholder="请输入内容">
                          <template slot="append">m²</template>
                        </el-input>
                        </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向新建/扩建:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向参与:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向参与:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否有意向:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-form label-width="120px" label-position="right">
                  <el-form-item label="主要能源管理措施:">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="补充说明:">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="客户意愿" name="sixth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>有意愿更换的设备</span>
            </div>
              <el-table style="width: 100%;">
                  <el-table-column
                    prop="index"
                    label="主要能源用途及其系统"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="主要用能设备"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="能源品种"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="型号规格"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="主要用能参数"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="更换数量"
                    >
                  </el-table-column>
                </el-table>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>有意愿改造的设备</span>
            </div>
            <el-table style="width: 100%;">
                  <el-table-column
                    prop="index"
                    label="主要能源用途及其系统"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="主要用能设备"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="能源品种"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="型号规格"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="主要用能参数"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="改造数量"
                    >
                  </el-table-column>
            </el-table>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>有意愿开展的业务</span>
            </div>
            <el-input type="textarea" :rows="6"></el-input>
          </el-tab-pane>
          <el-tab-pane label="项目建议" name="seventh">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>综合能源服务业务潜力信息</span>
            </div>
            <el-form label-width="170px" label-position="right">
                  <el-form-item label="是否建议开展节能改造:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="14">
                        <el-checkbox-group v-model="type">
                          <el-checkbox label="供冷热系统改造" name="type"></el-checkbox>
                          <el-checkbox label="照明节能改造" name="type"></el-checkbox>
                          <el-checkbox label="电机节能改造" name="type"></el-checkbox>
                          <el-checkbox label="其他" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="是否建议开展分布式能源建设:">
                    <el-row>
                      <el-col :span="10">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="14">
                        <el-checkbox-group v-model="type">
                          <el-checkbox label="光伏" name="type"></el-checkbox>
                          <el-checkbox label="风电" name="type"></el-checkbox>
                          <el-checkbox label="生物质发电" name="type"></el-checkbox>
                          <el-checkbox label="三联供" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="是否建议利用余热余压:">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展蓄冷热:">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展变配电设备改造:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展充电桩建设:">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展储能建设:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展能效提升:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议建设能源平台系统:">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议参与市场化售电:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否建议开展电力需求响应:">
                    <el-radio-group v-model="resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>电能替代潜力信息</span>
            </div>
            <el-form label-width="170px" label-position="right">
              <el-form-item label="是否建议开展电能替代:">
                    <el-row>
                      <el-col :span="8">
                        <el-radio-group v-model="resource">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="16">
                        <el-checkbox-group v-model="type">
                          <el-checkbox label="电锅炉" name="type"></el-checkbox>
                          <el-checkbox label="热泵" name="type"></el-checkbox>
                          <el-checkbox label="电窑炉" name="type"></el-checkbox>
                          <el-checkbox label="冶金电炉" name="type"></el-checkbox>
                          <el-checkbox label="电动汽车" name="type"></el-checkbox>
                          <el-checkbox label="分散电采暖" name="type"></el-checkbox>
                          <el-checkbox label="农业辅助生产及农产品加工" name="type"></el-checkbox>
                          <el-checkbox label="机场、港口岸" name="type"></el-checkbox>
                          <el-checkbox label="其他" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-row>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="调研资料" name="eighth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>调研资料信息</span>
            </div>
            <el-table style="width: 100%;">
                  <el-table-column
                    prop="index"
                    type="selection"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="资料名称"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="资料类型"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="上传日期"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="操作"
                    >
                  </el-table-column>
            </el-table>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>资料附件信息</span>
            </div>
            <div class="uploadList">
              <span style="color:blue;cursor:pointer;">关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span>(1.19 MB)</span><br>
              <span style="color:blue;cursor:pointer;">关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span>(1.19 MB)</span><br>
            </div>
          </el-tab-pane>
          <el-tab-pane label="服务方案" name="ninth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>服务方案信息</span>
            </div>
            <el-table style="width: 100%;">
                  <el-table-column
                    prop="type"
                    label="序号"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="方案名称"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="利润率"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="方案版本号"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="编制人"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="编制单位"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="编制日期"
                    >
                  </el-table-column>
            </el-table>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>方案附件信息</span>
            </div>
            <div class="uploadList">
              <span style="color:blue;cursor:pointer;">关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span>(1.19 MB)</span><br>
              <span style="color:blue;cursor:pointer;">关于印发执行《输配电成本核算办法》有关问题意见的通知.docx (1.19 MB)</span><span>(1.19 MB)</span><br>
            </div>
          </el-tab-pane>
          <el-tab-pane label="意向洽谈" name="tenth">
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>洽谈记录信息</span>
            </div>
            <el-table style="width: 100%;">
                  <el-table-column
                    prop="type"
                    label="序号"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="客户联系人"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="联系电话"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="客户意愿"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="商务模式"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="潜在供应商"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="客户需求描述"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="洽谈过程描述"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="洽谈责任人"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="洽谈日期"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="number"
                    label="洽谈状态"
                    >
                  </el-table-column>
            </el-table>
            <div class="ctitle">
                  <div class="leftIcon"></div>
                  <span>洽谈附件信息</span>
            </div>
            <div class="uploadList">
              <span style="color:blue;cursor:pointer;">关于印发执行《输配电成本核算办法》有关问题意见的通知.docx</span><span>(1.19 MB)</span><br>
              <span style="color:blue;cursor:pointer;">关于印发执行《输配电成本核算办法》有关问题意见的通知.docx</span><span>(1.19 MB)</span><br>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </slide-panel>
  </div>
</template> 

<script>
import demo from "../assets/js/demo"
export default{
  ...demo
}
</script>
<style>
@import "../assets/css/demo.css";
</style>
