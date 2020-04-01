<template>
    <div class="item" :class="{'done': !!item.done}">
        <span @click="clickDone" class="check"><i class="fas fa-check"></i></span>
        <Textarea :name.sync="localName" :placeholder="'Add an item'"/>
        <span @click="actionDelTask"><i class="far fa-trash-alt"></i></span>
    </div>
</template>

<script>
    import Textarea from '@/components/Textarea'
    import {mapActions} from "vuex";

    export default {
        name: "TodoItem",
        components: {
            Textarea
        },
        data() {
            return {
                localName: this.title
            }
        },
        props: {
            card: Object,
            title: String,
            item: Object
        },
        methods: {
            ...mapActions([
                'putCardItem'
            ]),
            actionDelTask() {
                this.$emit('update:removeTaskId', this.item.id);
                this.$emit('update:isTask', true);
                this.$emit('update:isCancel', false);
                this.$emit('update:popupVisible', true);
            },
            async clickDone () {
                await this.putCardItem({
                    ...this.card,
                    toDos: this.card.toDos.map(item => {
                        if (item.id === this.item.id) {
                            return {...item, done: (item.done ? 0 : 1)}
                        }
                        return item
                    })
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .item {
        display: flex;
        align-items: center;
        margin: 5px 0;
        justify-content: space-between;
        border-radius: 4px;
        background: white;
        textarea {
            margin-left: 0;
        }
        &.done {
            background: lightblue!important;
            textarea {
                text-decoration: line-through;
                color: rgb(117, 117, 117);
            }
            .check {
                color: green;
            }
        }
        span {
            padding: 2px;
            margin: 0 5px;
            transition: all 0.3s;
            &:hover {
                color: red;
                transition: all 0.3s;
            }
            &.check {
                color: lightgrey;
                &:hover {
                    color: green;
                    transition: all 0.3s;
                }
            }
        }
        p {
            font-size: 16px;
        }
    }
</style>