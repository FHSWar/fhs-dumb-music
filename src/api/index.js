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
export const getArtistsSongs = (data) => axios.get('artists', data)

// export const getHotArtists = () => axios.get('top/artists?offset=0&limit=5')
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    axios.get('top/artists?offset=0&limit=5')
      .then(function (result) {
        // 只要结果里的数组, code===200 是稳的
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  // 这里 return 的是 promise 对象呀傻仔
  return new Promise(function (resolve, reject) {
    const letterArtists = []
    // 每一条请求的 limit 都是 5, 合起来就是三十条, 也就是说一个字母给到三十首歌
    axios.all([
      axios.get(`artist/list?offset=0&limit=1&type=1&area=0&initial=${letter}`),
      axios.get(`artist/list?offset=0&limit=1&type=1&area=1&initial=${letter}`),
      axios.get(`artist/list?offset=0&limit=1&type=1&area=7&initial=${letter}`),
      axios.get(`artist/list?offset=0&limit=1&type=1&area=8&initial=${letter}`),
      axios.get(`artist/list?offset=0&limit=1&type=1&area=16&initial=${letter}`),
      axios.get(`artist/list?offset=0&limit=1&type=1&area=96&initial=${letter}`)
    ])
      .then(function (result) {
        // 一次可以 push 多个
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getHotArtists()] // 这个好有灵气, getHotArtists() 的结果就是 list 数组中的第一个元素
    // UTF-16 编码序列中 A 到 Z
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      // getLetterArtists(char) 返回的已经是一维数组, 这样一搞, list 就是一个二维数组
      list.push(getLetterArtists(char))
    }
    // 我认为这里不需要再套一个 axios (但是不可行) (getLetterArtists return 的是 promise 对象呀傻仔)
    /* const obj = {}
    obj.keys = keys
    obj.list = list
    resolve(obj) */
    axios.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    const category = {
      officialList: [
        { name: '飙升榜' },
        { name: '新歌榜' },
        { name: '原创榜' },
        { name: '热歌榜' }
      ],
      recList: [
        // { name: '云音乐说唱榜' },
        { name: '云音乐电音榜' },
        { name: '云音乐欧美新歌榜' },
        // { name: '云音乐ACG榜' },
        { name: '云音乐古典榜' }
      ],
      globalList: [
        { name: '美国Billboard榜' },
        { name: 'UK排行榜周榜' },
        { name: 'Beatport全球电子舞曲榜' },
        { name: '日本Oricon榜' },
        { name: 'iTunes榜' },
        { name: '云音乐韩语榜' }
      ],
      otherList: [
        // { name: 'KTV唛榜' },
        // { name: '法国 NRJ Vos Hits 周榜' },
        { name: '云音乐ACG动画榜' },
        { name: '云音乐ACG游戏榜' },
        { name: '云音乐欧美热歌榜' }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    axios.get('toplist/detail')
      .then(function (data) {
        // console.log('数据', data)
        data.list.forEach(function (obj) {
          let flag = false
          for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopList = (data) => axios.get('top/list', data)
export const getSearchList = (data) => axios.get('search?type=1', data)
export const getSearchHot = () => axios.get('search/hot')
