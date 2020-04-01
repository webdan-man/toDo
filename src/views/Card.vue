<template>
    <div class="about">
        <div class="card">
            <CardHeader
                :card="card"
                @actionDel="actionDel"
            />
            <div class="todoList">
                <template v-for="item in card.toDos">
                    <TodoItem
                            :key="item.id"
                            :title="item.title"
                            :card="card"
                            :item="item"
                            :removeTaskId.sync="removeTaskId"
                            :isTask.sync="isTask"
                            :isCancel.sync="isCancel"
                            :popupVisible.sync="popupVisible"
                    />
                </template>
                <div class="item">
                    <Textarea :actionEnter="clickEnter" :name.sync="localName" :placeholder="'Add an item'"/>
                </div>
            </div>
            <div class="buttons">
                <button class="cancel" @click="actionCancel">Cancel</button>
                <button @click="saveCard">Save</button>
            </div>
            <router-link tag="div" to="/"><i class="fas fa-arrow-left"></i></router-link>
        </div>
        <Popup
            v-if="popupVisible"
            :popupVisible.sync="popupVisible"
            :title="popupTitle()"
            @remove="removeFunc"
        />
    </div>
</template>
<script>
    import Textarea from '@/components/Textarea'
    import CardHeader from '@/components/CardHeader'
    import TodoItem from '@/components/TodoItem'
    const Popup = () => import('@/components/Popup');

    import {mapActions, mapState} from "vuex";

    export default {
        name: 'About',
        components: {
            Textarea,
            CardHeader,
            Popup,
            TodoItem
        },
        props: {
            id: String
        },
        data () {
            return {
                popupVisible: false,
                removeId: '',
                removeTaskId: '',
                isTask: false,
                isCancel: false,
                localName: ''
            }
        },
        computed: {
            ...mapState([
                'card',
                'cardList'
            ]),
            nameLocal: {
                get () {
                    return this.card.name
                },
                set (val) {
                    this.localName = val;
                }
            }
        },
        methods: {
            popupTitle() {
                if (this.isCancel) return 'Cancel it';
                if (this.isTask) return 'Remove this task';
                return 'Remove this card';
            },
            removeFunc() {
                if (this.isCancel) return this.cancelIt();
                if (this.isTask) return this.removeTask();
                return this.removeCard()
            },
            ...mapActions([
                'getCard',
                'putCard',
                'deleteCard',
                'putCardItem',
                'getCards'
            ]),
            async clickEnter () {
                await this.putCardItem({
                    save: false,
                    card: {
                    ...this.card,
                    toDos: this.card.toDos.concat([{
                        id: Date.now(),
                        title: this.localName
                    }])}
                });
                this.localName = '';
            },
            actionDel(id) {
                this.isTask = false;
                this.popupVisible = true;
                this.removeId = id;
            },
            async cancelIt () {
                await this.getCards();
                await this.putCardItem({
                    save: false,
                    card: this.cardList.find(item => item.id === this.card.id)
                });
                this.popupVisible = false;
            },
            async actionCancel () {
                this.isTask = false;
                this.isCancel = true;
                this.popupVisible = true;
            },
            async saveCard() {
                await this.putCardItem({
                    save: true,
                    card: this.card
                });
            },
            async removeCard() {
                await this.deleteCard(this.removeId);
                this.popupVisible = false;
                if (this.$route.path !== '/') await this.$router.push({ path: '/' })
            },
            async removeTask() {
                await this.putCardItem({
                    save: false,
                    card: {
                        ...this.card,
                        toDos: this.card.toDos.filter(task => task.id !== this.removeTaskId)
                    }
                });
                this.popupVisible = false;
            }
        },
        async mounted() {
            await this.getCard(this.id);
        }
    }
</script>
<style scoped lang="scss">
    .about {
        display: flex;
    }
    .card {
        width: 100%;
        min-width: 290px;
        margin: 15px;
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        background: lightblue;
        padding: 15px;
        align-items: flex-end;
        .header {
            width: 100%;
        }
        .buttons {
            width: 100%;
        }
        .todoList {
            width: 100%;
            margin-top: 5px;
            .item {
                display: flex;
                align-items: center;
                margin: 5px 0;
                justify-content: space-between;
                border-radius: 4px;
                background: white;
                textarea {
                    margin-left: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    padding: 5px;
                    text-overflow: ellipsis;
                }
                span {
                    padding: 2px;
                    margin: 0 5px;
                    transition: all 0.3s;
                    &:hover {
                        color: red;
                        transition: all 0.3s;
                    }
                }
                p {
                    font-size: 16px;
                    white-space: nowrap;
                    overflow: hidden;
                    padding: 5px;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
