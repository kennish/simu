<template>
  <div class="key" @click="keyIn(value)">
    {{remove || hidden? '': value}}
    <img class="removeIcon" v-if="remove" :src="require('@/assets/img/removeIcon.png')"/>
    <img class="removeIcon" v-if="hidden" :src="require('@/assets/img/hideKeypad.png')"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    remove: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  created(){
    
  },
  methods: {
    keyIn (key) {
      this.$emit('click', key)
    }
  }
}
</script>

<style scoped>
.key{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .32rem;
  color: #666666;
  flex: 1;
  height: 1rem;
  border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  /* box-sizing: border-box; */
}
.removeIcon{
  display: block;
  width: .44rem;
}
</style>