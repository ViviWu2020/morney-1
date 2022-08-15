<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id"
      :to="`/labels/edit/${tag.id}`"><span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
      <div class="space"></div>
      <div class="createTag-wrapper">
        <Button @click.native="createTag">新建标签</Button>
      </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import TagHelper from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component({
  components: {Button},
  computed:{
    tags(){
      return this.$store.state.tagList
    }
  }
})
export default class Labels extends mixins(TagHelper){
  created(){
    this.$store.commit('fetchTags')
  }
}
</script>

<style lang="scss" scoped>
  .tags{
    font-size: 16px;
    background: white;
    padding: 0 16px;
    > .tag{
      min-height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      svg{
        width: 22px;
        height: 22px;
        color: #6666;
        margin-right: 16px;
      }
    }
  }
  .space{
    width: 100%;
    height: 44px;
  }
  .createTag{
    background: #757575;
    color: white;
    border: none;
    border-radius:4px;
    height: 40px;
    padding: 0 16px;
    &-wrapper{
      text-align: center;
    }
  }
</style>