<template>
    <div class="title">
        <Textarea :name.sync="message"/>
        <div class="buttons">
            <button @click="$emit('update:isStartCreate', true)" class="cancel">Cancel</button>
            <button @click="createCard" :disabled="!message.length">Save</button>
        </div>
    </div>
</template>

<script>
    import Textarea from '@/components/Textarea'
    import {mapActions} from "vuex";
    export default {
        name: "NewCard",
        props: {
            isStartCreate: Boolean
        },
        components: {
            Textarea
        },
        data () {
            return {
                message: '',
                paramsDefault: {
                    toDos: []
                }
            }
        },
        methods: {
            ...mapActions([
                'postCard'
            ]),
            async createCard() {
                await this.postCard({
                    ...this.paramsDefault,
                    name: this.message,
                    id: Date.now()
                });
                this.message = ''
            },
        },
        mounted() {
            this.$el.querySelector("textarea").focus()
        }
    }
</script>

<style scoped lang="scss">
    .title {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        .buttons {
            width: 100%;
        }
    }
</style>