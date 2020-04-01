<template>
    <textarea
          @change="actionEnter ? actionEnter() : false"
          @keypress.enter.prevent="actionEnter ? actionEnter() : false"
          v-model="nameLocal"
          :placeholder="placeholder ? placeholder : 'Enter a title...'"
    ></textarea>
</template>

<script>
    export default {
        name: "Textarea",
        props: {
            name: String,
            placeholder: String,
            actionEnter: Function
        },
        computed: {
            nameLocal: {
                get () {
                    return this.name
                },
                set (val) {
                    this.$emit('update:name', val);
                }
            }
        }
    }
</script>

<style scoped>

</style>