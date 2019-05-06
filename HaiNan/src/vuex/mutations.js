export const cveTrendData = (state, value) => { state.cveTrend = value }
export const analysisTrendData = (state, value) => { state.analysisTrend = value }
export const cveStyleAttackData = (state, value) => { state.cveStyleAttack = value }
export const indexCveresult = (state, val) => {
  state.indexCveresult = val
}
export const radarRes = (state, val) => {
  state.radarRes = val
}
export const softGeneTrendData = (state, val) => { state.softGeneTrend = val }
export const wordCloudData = (state, value) => { state.wordCloud = value }
export const exploitCodeData = (state, value) => { state.exploitCode = value }

export const bugStoreRes = (state, o) => {
  state.bugStoreRes = o
}

export const softStoreRes = (state, o) => {
  state.softStoreRes = o
}

export const userList = (state, o) => {
  state.userList = o
}

export const relateBugGene = (state, o) => {
  state.relateBugGene = o
}
