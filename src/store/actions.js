import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER
} from './mutations-type'

export default {
  /*
  setFullScreen ({ commit }, flag) {
    commit('changeFullScreen', flag)
  }
   */
  setFullScreen ({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
    commit(SET_MINI_PLAYER, !flag) // 这是我自己加的, 可是很奇怪, 老师代码好像没问题啊???
  },
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  }
}
