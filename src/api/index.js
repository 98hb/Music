// api 文件夹下 各个请求模块js,都统一来到index.js再向外导出
import { recommendMusic, newMusic } from './Home'
import { hotSearch, keySearch } from './Search'
export const recommendMusicAPI = recommendMusic//请求推荐歌单的方法导出
export const newMusicAPI = newMusic//请求首页最新音乐的方法导出
export const hotSearchAPI = hotSearch//请求搜索页面热搜关键词的方法导出
export const keySearchAPI = keySearch//请求搜索页面热搜关键词结果的方法导出
