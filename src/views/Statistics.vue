<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
      <ol v-if="groupList.length>0">
        <li v-for="(group,index) in groupList" :key="index">
          <h3 class="title">{{beauty(group.title)}}<span>￥{{group.total}}</span></h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{tagsString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
        </li>
      </ol>
    <div v-else class="noResult">
      你还没有添加哦~
    </div>
  </Layout>
</template>


<script lang="ts">
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/consts/typeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';


@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  get groupList() {
    const {recordList} = this
    const newList = clone(recordList).filter(record => record.type===this.type).sort((a,b)=> dayjs(b.createAt).valueOf()-dayjs(a.createAt).valueOf())
    if (newList.length === 0){return []}
    type Result = {title: string, total?: number, items: RecordItem[]}[];
    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items:[newList[0]]}];
    for (let i = 1; newList.length>i;i++){
      const current = newList[i];
      const last = result[result.length-1];
      if (dayjs(current.createAt).isSame(dayjs(last.title),'day')){
        last.items.push(current)
      }else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]})
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum,item)=> sum + item.amount,0)
    })
    return result
  }
  beauty(string: string){
    const today = dayjs()
    const otherDay = dayjs(string)
    if (otherDay.isSame(today,'day')){
      return '今天'
    }else if (otherDay.isSame(today.subtract(1,'day'),'day')){
      return '昨天'
    }else if (otherDay.isSame(today.subtract(2,'day'),'day')){
      return '前天'
    }else if (otherDay.isSame(today,'year')){
      return otherDay.format('M月D日')
    }else {
      return otherDay.format('YYYY年M月D日')
    }
  }

  tagsString(tags: Tag[]){
    if (tags.length === 0){return '无'}
    else{
      return tags.map(tag => tag.name).join('，')
    }
    //return tags.length === 0 ? '无': tags.join()
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  typeList = typeList;

}
</script>

<style lang="scss" scoped>
.noResult{
  padding: 24px;
  text-align: center;
}
::v-deep {
  .type-item {
    background: #c4c4c4;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
  }

  .interval-item {
    height: 48px;
  }
}
%item{
  min-height: 40px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title{
  @extend %item
}
.record{
  @extend %item;
  background: white;
}
.notes{
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}
</style>