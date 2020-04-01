import Vue from 'vue'
import Vuex from 'vuex'
import {
  GET_CARDS,
  DELETE_CARD,
  GET_CARD,
  POST_CARD,
  LOAD_CARDS,
  REMOVE_CARD,
  LOAD_CARD,
  PUT_CARD,
  UPDATE_CARD,
  CREATE_CARD,
  PUT_CARD_ITEM
} from './types';

import api from '../api'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardList: [],
    card: {}
  },
  mutations: {
    [LOAD_CARDS]: function (state, payload) {
      state.cardList = payload
    },
    [REMOVE_CARD]: function (state, payload) {
      state.cardList.splice(state.cardList.findIndex(item => item.id === payload), 1);
    },
    [LOAD_CARD]: function (state, payload) {
      state.card = payload
    },
    [CREATE_CARD]: function (state, payload) {
      state.cardList.push(payload)
    },
    [UPDATE_CARD]: function (state, payload) {
      state.cardList[state.cardList.findIndex(item => item.id === payload.id)] = payload
    }
  },
  actions: {
    [GET_CARDS]: async function({commit}) {
      const response = await api.getCards();
      commit(LOAD_CARDS, response);
    },
    [DELETE_CARD]: async function({commit}, payload) {
      await api.deleteCard(payload);
      commit(REMOVE_CARD, payload);
    },
    [GET_CARD]: async function({commit}, payload) {
      const response = await api.getCard(payload);
      commit(LOAD_CARD, response);
    },
    [POST_CARD]: async function({commit}, payload) {
      await api.postCard(payload);
      commit(CREATE_CARD, payload);
    },
    [PUT_CARD]: async function({commit}, payload) {
      await api.putCard(payload);
      commit(UPDATE_CARD, payload);
    },
    [PUT_CARD_ITEM]: async function({commit}, payload) {
      if (payload.save) await api.putCard(payload.card);
      commit(LOAD_CARD, payload.card)
    }
  },
  modules: {
  }
})
