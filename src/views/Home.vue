<template>
  <div class="home">
    <template v-if="cardList.length">
      <router-link tag="div" class="card" v-for="card in cardList" :key="card.id" :to="`/${card.id}`">
        <CardHeader
                :card="card"
                @actionDel="actionDel"
        />
        <CardToDoList :card="card"/>
      </router-link>
    </template>
    <div class="card add">
      <span v-if="isStartCreate" @click="isStartCreate = false"><i class="far fa-plus-square"></i></span>
      <NewCard
              v-if="!isStartCreate"
              :isStartCreate.sync="isStartCreate"
      />
    </div>
    <Popup
            v-if="popupVisible"
            :popupVisible.sync="popupVisible"
            :title="'Remove this card'"
            @remove="removeCard()"
    />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import CardHeader from '@/components/CardHeader'
  import CardToDoList from '@/components/CardToDoList'
  const Popup = () => import('@/components/Popup');
  const NewCard = () => import('@/components/NewCard');

  export default {
    name: 'Home',
    components: {
      CardHeader,
      CardToDoList,
      Popup,
      NewCard
    },
    data () {
      return {
        isStartCreate: true,
        popupVisible: false,
        removeId: '',
      }
    },
    methods: {
      actionDel(id) {
        this.popupVisible = true;
        this.removeId = id;
      },
      async removeCard() {
        await this.deleteCard(this.removeId);
        this.popupVisible = false;
        if (this.$route.path !== '/') await this.$router.push({ path: '/' })
      },
      ...mapActions([
        'getCards',
        'deleteCard'
      ])
    },
    computed: {
      ...mapState([
        'cardList'
      ])
    },
    async mounted() {
      await this.getCards()
    }
  }
</script>
<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    .card {
      width: 290px;
      margin: 15px;
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      border-radius: 4px;
      background: lightblue;
      padding: 10px 15px;
      min-height: 200px;
      &.add {
        align-items: center;
        justify-content: center;

        span {
          transition: all 0.3s;
          font-size: 50px;
        }

        &:hover {
          transition: all 0.3s;

          span {
            transition: all 0.3s;
            color: darkgreen;
          }
        }
      }
    }
  }
</style>
