<template>
  <label class="formItem">
    <span class="name">{{this.fieldName}}</span>
    <input :value="value"
           @input="OnValueChanged($event.target.value)"
           type="text" :placeholder="placeholder">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class FormItem extends Vue{
  @Prop({default:''}) readonly value!: string;

  @Prop({required: true}) fieldName!:string
  @Prop() placeholder?:string

  OnValueChanged(value:string){
    this.$emit('update:value',value)
  }
}
</script>

<style lang="scss" scoped>
.formItem{
  font-size: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  > .name{
    padding-right: 16px;
  }
  input{
    height: 40px;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>