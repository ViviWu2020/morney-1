<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          @click="toggle(tag)"
          :class="{selected : selectedTags.indexOf(tag)>=0}"
      >{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import TagHelper from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component
export default class Tags extends mixins(TagHelper){
  get tagList(){
    return this.$store.state.tagList
  }

  selectedTags: string[] = []

  created(){
    this.$store.commit('fetchTags')
  }
  toggle(tag:string){
    const index = this.selectedTags.indexOf(tag)
    if (index>=0){
      this.selectedTags.splice(index,1)
    }else{
      this.selectedTags.push(tag)
    }
    this.$emit('update:value', this.selectedTags)
  }
  create(){
    const name = window.prompt('请输入标签名')
    if (!name){
      return window.alert('标签名不能为空')
    }
      this.$store.commit('createTag',name)
    if (this.$store.state.createTagError){
      if (this.$store.state.createTagError === 'tag name duplicated'){
        window.alert('标签名重复了')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags{
  background: white;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  > .current{
    flex-wrap: wrap;
    display: flex;
    > li{
      background: #d9d9d9;
      $h:24px;
      height: $h;
      line-height: $h;
      padding: 0 16px;
      border-radius: $h/2;
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
        background: purple;
        color: white;
      }
    }
  }
  > .new{
    padding-top: 16px;
    button{
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 4px;
    }
  }
}
</style>