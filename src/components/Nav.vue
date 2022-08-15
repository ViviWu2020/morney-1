<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      Money
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      Labels
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      Statistics
    </router-link>
  </nav>
</template>

<script lang="ts">

import Vue from 'vue';

import {Component} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon}
})
export default class Nav extends Vue {

}
</script>

<style lang="scss" scoped>
nav{
  display: flex;
  box-shadow: 0 0 3px rgb(0,0,0,0.25);
  flex-direction: row;
  font-size: 12px;
  > .item{
    padding: 2px 0;
    width: 33.33333%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon{
      width: 30px;
      height: 30px;
    }
  }
  > .item.selected{
    color: purple;
  }
}
</style>