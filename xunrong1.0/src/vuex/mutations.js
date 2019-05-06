export const setMapData = (state, val) => { state.mapData = val }
export const setBroadcastData = (state, val) => { state.broadcastData = val }
export const setMaliciousInvasion = (state, val) => { state.MaliciousInvasion = val }
export const setStatusData = (state, val) => { state.statusData = val }
export const setWordcloudData = (state, val) => { state.wordcloudData = val }
export const setSideBar = (state, val) => { state.sideBar = val }
export const setAboutData = (state, val) => { state.aboutData = val }
export const setLang = (state) => {
  state.language = state.language === 'zh' ? 'en' : 'zh'
  localStorage.setItem('locale', state.language)
}
