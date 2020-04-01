<template>
    <div class="popup">
        <div class="overlap" @click="$emit('update:popupVisible', false)"></div>
        <div class="card">
            <p>{{title}}</p>
            <div class="buttons">
                <button class="cancel" @click="$emit('update:popupVisible', false)">No</button>
                <button class="remove" @click="$emit('remove')">Yes</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        props: {
            popupVisible: Boolean,
            title: String
        },
    }
</script>

<style scoped lang="scss">
    .popup {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        .overlap {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }
        .card {
            width: 290px;
            position: relative;
            z-index: 3;
            border-radius: 4px;
            background: white;
            padding: 20px;
            box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                font-size: 20px;
                font-weight: bold;
                width: 100%;
                text-align: left;
            }
            .buttons {
                display: flex;
                justify-content: flex-end;
                margin-top: 20px;
            }
        }
    }
</style>