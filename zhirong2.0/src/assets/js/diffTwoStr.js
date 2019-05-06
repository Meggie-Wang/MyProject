export default (str1, str2) => {
  // # 找出相同的片段
  let x = str1.split('')
  let y = str2.split('')

  let long = []
  let short = []
  if (x.length !== y.length) {
    long = x.length > y.length ? x : y
    short = x.length > y.length ? y : x
  } else {
    long = x
    short = y
  }

  // 遍历对比
  // 比较段级的

  let sliceArr = []
  let silceItem = []
  let flag = 0
  let f = () => {
    for (flag; flag <= short.length; flag++) {
      if (short[flag] === undefined) { // 到最后一位时候
        silceItem.push('undefined')
        flag++
      } else {
        silceItem.push(short[flag])
      }

      if (long.join('').indexOf(silceItem.join('')) === -1) { // 片段不存在于long
        silceItem.pop() // 删掉本次段上最后一位，保持插入aliceArr中的相同的片段
        if (silceItem.length > 30) { // 裁剪的片段长度大于一
          sliceArr.push(silceItem.join(''))
        }
        silceItem = []
        f()
      }
    }
  }
  f()

  // console.log(sliceArr)

  // - 计算相同的片段在str中的位置
  // - 判断段的显示
  let exportStr = (str) => {
    let indexArr = []
    sliceArr.forEach((i, j) => {
      let p = str.indexOf(i)
      while (p > -1) {
        indexArr.push([p, p + i.length, i.length, j, i])
        p = str.indexOf(i, p + 1)
      }
    })

    // 从长到短排序
    let resetArr = indexArr.sort((a, b) => {
      if (a[2] > b[2]) {
        return -1
      } else {
        return 1
      }
    })

    return str.split('').map((i, j) => {
      let times = 0
      let color = null
      resetArr.forEach((ii, jj) => {
        if (j >= ii[0] && j < ii[1]) {
          times++
          color = ii[3]
        }
      })
      return {
        name: i,
        value: Boolean(times),
        color: color
      }
    })
  }

  return [exportStr(str1), exportStr(str2)]
}
