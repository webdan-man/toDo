<template>
    <div class="todoList">
        <template v-for="(item, itemIndex) in card.toDos">
            <div v-if="itemIndex < 4" class="item"  :key="item.id">
                <p>
                    {{item.title}}
                </p>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "CardToDoList",
        props: {
            card: Object
        }
    }
</script>

<style scoped lang="scss">
    .todoList {
        width: 100%;
        margin-top: 5px;
        .item {
            border-radius: 4px;
            background: white;
            display: flex;
            align-items: center;
            padding: 5px;
            margin: 5px 0;
            justify-content: space-between;
            p {
                font-size: 16px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>