<template>
    <div class="header">
        <div class="title" @click.stop>
            <Textarea
                :actionEnter="actionEnter"
                :name.sync="nameLocal"
            />
            <span @click.stop="$emit('actionDel', card.id)"><i class="far fa-trash-alt"></i></span>
        </div>
        <span class="card-numbers">
            {{card.toDos && card.toDos.length}} cards
        </span>
    </div>
</template>

<script>
    import Textarea from '@/components/Textarea'
    import {mapActions} from "vuex";
    export default {
        name: "CardHeader",
        props: {
            card: Object
        },
        data() {
            return {
                localName: this.card.name
            }
        },
        methods: {
            ...mapActions([
                'putCard',
            ]),
            async actionEnter() {
                await this.putCard({
                    ...this.card,
                    name: this.localName
                });
            }
        },
        components: {
            Textarea
        },
        computed: {
            nameLocal: {
                get () {
                    return this.card.name
                },
                set (val) {
                    this.localName = val;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            span {
                display: inline-block;
                margin: 0 5px;
                transition: all 0.3s;
                padding: 2px;
                &:hover {
                    color: red;
                    transition: all 0.3s;
                }
            }
        }
        .card-numbers {
            color: lightslategray;
            font-size: 14px;
        }
    }
</style>