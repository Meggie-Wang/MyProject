export const setLang = (state) => {
  state.language = state.language === 'zh' ? 'en' : 'zh'
  localStorage.setItem('locale', state.language)
}
