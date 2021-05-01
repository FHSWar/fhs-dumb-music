// 这个JS文件就是专门用于管理请求各种接口地址的
import axios from './axios'

// 封装各种接口请求
export const getBanner = () => axios.get('banner?type=1')
export const getPersonalized = () => axios.get('personalized?limit=6') // 没有 limit 自己限制也很容易
export const getNewAlbum = () => axios.get('album/newest')
export const getNewSong = () => axios.get('personalized/newsong')
export const getPlayList = (data) => axios.get('playlist/detail', data)
export const getAlbum = (data) => axios.get('album', data)
export const getSongDetail = (data) => axios.get('song/detail', data)
export const getSongLyric = (data) => axios.get('lyric', data)
export const getSongURL = (data) => axios.get('song/url', data)
