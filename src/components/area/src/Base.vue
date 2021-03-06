<template>
  <div class="van-area">
    <van-picker
      ref="picker"
      showToolbar
      valueKey="name"
      :columns="areaColumns"
      @change="onChange"
      @confirm="handleAreaConfirm"
      @cancel="handleAreaCancel"
    />
  </div>
</template>

<script>
import { Picker } from 'vant';
import Api from './api/area';

const DEFAULT_PROVINCE = {
  code: '-1',
  name: '选择省份'
};

const DEFAULT_CITY = {
  code: '-1',
  name: '选择城市'
};

const DEFAULT_COUNTY = {
  code: '-1',
  name: '选择地区'
};

const PROVINCE_TYPE = 'provice';
const CITY_TYPE = 'city';
const COUNTY_TYPE = 'county';

const levelMap = {
  1: 'province_list',
  2: 'city_list',
  3: 'county_list'
};

export default {
  name: 'van-area',

  components: {
    [Picker.name]: Picker
  },

  props: {
    url: {
      type: String,
      default: ''
    },
    initCodes: Array,
    value: {},
    areaList: {
      type: Object,
      default: () => ({
        province_list: {},
        city_list: {},
        county_list: {}
      })
    },
    // 省市县显示列数，3-省市县，2-省市，1-省
    columnsNum: {
      type: [String, Number],
      default: 3
    }
  },

  data() {
    return {
      areaColumns: [],
      fetchedCode: {},
      curAreaList: this.areaList
    };
  },

  watch: {
    value() {
      this.updateColumns();
    }
  },

  methods: {
    initColumns() {
      const areaList = this.areaList;

      if (!areaList || (areaList && typeof areaList.province_list !== 'object')) return [];

      const columns = [];
      const curValue = this.value || '';

      columns.push({
        values: [DEFAULT_PROVINCE].concat(this.computedAreaList(PROVINCE_TYPE)),
        className: 'van-area__province',
        defaultIndex: this.getAreaIndex(PROVINCE_TYPE, curValue)
      });

      const columnsNum = this.columnsNum;
      if (+columnsNum > 1) {
        columns.push({
          values: [DEFAULT_CITY].concat(this.computedAreaList(CITY_TYPE, curValue.slice(0, 2))),
          className: 'van-area__city',
          defaultIndex: this.getAreaIndex(CITY_TYPE, curValue)
        });
      }

      if (+columnsNum > 2) {
        columns.push({
          values: [DEFAULT_COUNTY].concat(this.computedAreaList(COUNTY_TYPE, curValue.slice(0, 4))),
          className: 'van-area__county',
          defaultIndex: this.getAreaIndex(COUNTY_TYPE, curValue)
        });
      }

      this.areaColumns = columns;
    },
    // 根据省市县类型和对应的`code`获取对应列表
    computedAreaList(type, code) {
      const result = [];
      const curAreaList = this.curAreaList;
      const areaList = type === PROVINCE_TYPE
        ? curAreaList.province_list
        : (type === CITY_TYPE ? curAreaList.city_list : curAreaList.county_list);

      for (const i in areaList) {
        // 如果为省类型直接插入，因为省那一列是全部显示的
        // 其他类型需要找到前缀相同的
        if (type === PROVINCE_TYPE || (code && i.slice(0, code.length) === code)) {
          result.push({
            code: i,
            name: areaList[i]
          });
        }
      }

      return result;
    },
    // 获取对应省市县在列表中的索引
    getAreaIndex(type, code) {
      const compareNum = type === PROVINCE_TYPE
        ? 2
        : (type === CITY_TYPE ? 4 : 6);
      const areaList = this.computedAreaList(type, code.slice(0, compareNum - 2));

      for (let i = 0; i < areaList.length; i++) {
        if (+areaList[i].code.slice(0, compareNum) === +code.slice(0, compareNum)) {
          return i + 1;
        }
      }

      return 0;
    },
    onChange(picker, values, index) {
      const code = values[index].code;
      // 处理省变化
      if (index === 0) {
        this.getAreaList(code).then(() => {
          picker.setColumnValues(
            1,
            [DEFAULT_CITY].concat(this.computedAreaList(CITY_TYPE, code.slice(0, 2)))
          );
          picker.setColumnValues(
            2,
            [DEFAULT_COUNTY].concat(this.computedAreaList(COUNTY_TYPE, code.slice(0, 4)))
          );
        });
      } else if (index === 1) {
        this.getAreaList(code).then(() => {
          picker.setColumnValues(
            2,
            [DEFAULT_COUNTY].concat(this.computedAreaList(COUNTY_TYPE, code.slice(0, 4)))
          );
        });
      }
    },
    getAreaObj(areas) {
      const result = areas.reduce((obj, area) => {
        obj[area.areaCode] = area.areaName;
        return obj;
      }, {});

      return result;
    },
    getAreaList(parentCode = '000000') {
      return new window.Promise((resolve, reject) => {
        // 缓存
        if (parentCode === '-1' || this.fetchedCode[parentCode]) {
          resolve();
          return;
        }

        Api.requestAreaList(this.url, parentCode)
          .then(({ result }) => {
            const updateKey = levelMap[result[0].level];
            this.curAreaList = {
              ...this.curAreaList,
              [updateKey]: {
                ...this.curAreaList[updateKey],
                ...this.getAreaObj(result)
              }
            };
            if (parentCode) this.fetchedCode[parentCode] = true;
            resolve();
          });
      });
    },
    handleAreaConfirm(values) {
      this.$emit('confirm', values);
    },
    handleAreaCancel() {
      this.$emit('cancel');
    },
    updateColumns() {
      const p = this.initCodes.reduce((promise, code) => {
        return promise.then(() => {
          return this.getAreaList(code);
        });
      }, new window.Promise(resolve => {
        resolve();
      }));

      p.then(() => {
        this.initColumns();
        this.setIndex();
      });
    },
    setIndex() {
      this.$nextTick(() => {
        const code = this.value || '';
        const { picker } = this.$refs;
        picker && picker.setIndexes([
          this.getAreaIndex('province', code),
          this.getAreaIndex('city', code),
          this.getAreaIndex('county', code)
        ]);
      });
    }
  },

  created() {
    this.updateColumns();
  }
};
</script>
