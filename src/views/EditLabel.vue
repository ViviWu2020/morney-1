<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="updateTag"
                field-name="标签名" placeholder="请输入标签"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';


@Component({
  components: {Button, FormItem},
  computed:{
    tag(){
      return this.$store.state.currentTag
    }
  }
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id
    this.$store.commit('fetchTags')
    this.$store.commit('setCurrentTag',id)
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      this.$store.commit('updateTag', {id:this.tag.id, name})
    }
  }

  remove() {
    if (this.tag) {
      this.$store.commit('removeTag', this.tag.id)
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  background: white;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .leftIcon {
    color: #6666;
    width: 22px;
    height: 22px;
  }

  .rightIcon {
    width: 22px;
    height: 22px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>