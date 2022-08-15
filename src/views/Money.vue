<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Tabs :data-source="typeList" :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="请输入备注" :value.sync="record.notes" />
    </div>
    <Tags @update:value="record.tags = $event"/>
  </Layout>
</template>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding: 12px 0;
}
</style>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import {Component} from 'vue-property-decorator';
import typeList from '@/consts/typeList';
import Tabs from '@/components/Tabs.vue';



@Component({
  components: {Tabs, FormItem, Tags, NumberPad},
  computed:{
    recordList(){
      return this.$store.state.recordList
    }
  }
})
export default class Money extends Vue {
  get recordList(){
    return this.$store.state.recordList
  }

  typeList = typeList
  tags = this.$store.state.tagList;
  record = {tags: [], notes: '', type: '-', amount: 0};


  created(){
    this.$store.commit('fetchRecords');
  }
  saveRecord() {
    if (this.record.tags.length === 0 || !this.record.tags){
      return window.alert('你还没选择标签哦')
    }
    this.$store.commit('createRecord',this.record)
     if (this.$store.state.createRecordError === null){
       window.alert('已保存');
       this.record.notes = ''
     }
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string)  {
    this.record.amount = parseFloat(value);
  }


}
</script>

