// 这个JS文件就是专门用于管理请求各种接口地址的
import Network from './network'

// 封装各种接口请求
export const getBanner = () => Network.get('banner?type=1')
export const getPersonalized = () => Network.get('personalized?limit=6') // 没有 limit 自己限制也很容易
export const getNewAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('personalized/newsong')
