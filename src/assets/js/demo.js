import slidePanel from "../../components/slidePanel.vue";
export default {
  name: 'demo',
  components:{
    slidePanel
  },
  data () {
    return {
      unfold: false,
      mainPage: 1,
      mainTotal: 100,
      firstPanel: false,
      customerNumberPanel: false,
      addTransformerPanel: false,
      addAirEnergy: false,
      addShipEnergy: false,
      assetsChange: false,
      surveyModifyPanel: false,
      surveyDetailPanel:false,
      secondPanel: false,
      planMoifyPanel: false,
      planDetailPanel: false,
      thirdPanel: false,
      talkRecordModifyPanel: false,
      talkRecordDetailPanel: false,
      forthPanel: false,
      mainUpForm: {
        department: "",
        number: '',
        name:''
      },
      mainDownForm: {
        industryType: '',
        status: ''
      },
      firstPanelTab: "first",
      firstPanelEnergyTab: "first",
      thirdPanelTab: "first",
      forthPanelTab: "first",
      forthPanelEnergyTab: "first",
      resource: '',
      type: [],
      mainTableData:[ //主页面表格数据
        {
          index: 1,
          orgNo: '省综合能源公司',
          consNo: '888888888',
          consName: '济南石化集团',
          elecAddr: '济南市槐荫区100号',
          tradeCate: '石化',
          contractCap: '10000',
          discStatus: '洽谈中',
        }
      ],
      secondPanelTable: [ //第二个面板的表格数据
        {
          index: 1
        }
      ],
      thirdPanelRecordTable: [
        {
          index: 1
        }
      ],
      investigateData: [
        {
          index: 1
        }
      ]
    }
  },
  mounted() {
    // this.queryMainTable()
  },
  watch: {
    firstPanel() {
      this.customerNumberPanel = false
      this.addTransformerPanel = false
      this.addAirEnergy = false
      this.addShipEnergy = false
      this.assetsChange = false
      this.surveyModifyPanel = false
      this.surveyDetailPanel = false
    },
    firstPanelTab() {
      this.customerNumberPanel = false
      this.addTransformerPanel = false
      this.addAirEnergy = false
      this.addShipEnergy = false
      this.assetsChange = false
      this.surveyModifyPanel = false
      this.surveyDetailPanel = false
    },
    secondPanel() {
      this.planMoifyPanel = false
      this.planDetailPanel = false
    },
    thirdPanel() {
      this.talkRecordModifyPanel = false
      this.talkRecordDetailPanel = false
    },
    thirdPanelTab() {
      this.talkRecordModifyPanel = false
      this.talkRecordDetailPanel = false
    }
  },
  methods: {
    queryMainTable() {
      let params = {
        orgNo: "dd"
      }
      this.post('http://eureka.sy.com.cn:9002/prjm-ms-cons/prjmmscons/csrConsList',params).then((res) => {
        if (res.responseCode == "200") {
          for (item of res.resultData.dataList) {
            this.mainTableData.put(item)
          }
        }
        console.log(this.mainTableData)
      })
    },
    openSearch() { //是否折叠
      this.unfold = !this.unfold
    },
    openFirst() {
      this.firstPanel = !this.firstPanel
    },
    openCusomerNumber() {
      this.customerNumberPanel = !this.customerNumberPanel
    },
    openAddTransformerPanel() {
      this.addTransformerPanel = !this.addTransformerPanel
    },
    openAddAirEnergyPanel() {
      this.addAirEnergy = !this.addAirEnergy
    },
    openAddShipEnergyPanel() {
      this.addShipEnergy = !this.addShipEnergy
    },
    openAssetsChangePanel() {
      this.assetsChange = !this.assetsChange
    },
    openSurveyModifyPanel(){
      this.surveyModifyPanel = !this.surveyModifyPanel
    },
    openSurveyDetail() {
      this.surveyDetailPanel = !this.surveyDetailPanel
    },

    openSecond() {
      this.secondPanel = !this.secondPanel
    },
    openPlanModify() {
      this.planMoifyPanel = !this.planMoifyPanel
    },
    openPlanDetail() {
      this.planDetailPanel = !this.planMoifyPanel
    },

    openThird() {
      this.thirdPanel = !this.thirdPanel
    },
    openTalkRecordModify() {
      this.talkRecordModifyPanel = !this.talkRecordModifyPanel
    },
    openTalkRecordDetail() {
      this.talkRecordDetailPanel = !this.talkRecordDetailPanel
    },

    openForth() {
      this.forthPanel = !this.forthPanel
    },
  }
}