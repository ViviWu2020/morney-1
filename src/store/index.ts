import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';
import router from '@/router';
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    // records store
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') ||'[]') as RecordItem[]
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
    },
    createRecord (state,record: RecordItem) {
      const record2 = clone(record);
      record2.createAt = new Date().toISOString();
      state.recordList.push(record2)
      store.commit('saveRecords')
    },
    // tags store
    setCurrentTag(state,id){
      state.currentTag = state.tagList.filter(tags => tags.id === id)[0]
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
       if (!state.tagList||state.tagList.length === 0){
         store.commit('createTag','衣')
         store.commit('createTag','食')
         store.commit('createTag','住')
         store.commit('createTag','行')
       }
    },
    saveTags(state){
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state,name: string) {
      state.createTagError = null
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated')
        return
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
    },
    updateTag(state,payload:{id: string, name: string}){
      const {id,name} = payload;
      const idList = state.tagList.map(item => item.id);
      const names = state.tagList.map(item => item.name);
      if (idList.indexOf(id) >= 0) {
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.id = tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag (state,id){
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >=0){
      state.tagList.splice(index, 1);
      store.commit('saveTags')
        router.back()
      }else{
        window.alert('删除失败')
      }
    },
  },
})


export default store