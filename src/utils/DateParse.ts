const dateParse = (dateInfo: string) => {
  let hour: number
  let noon: string
  let month: string
  let day: string

  if (parseInt(dateInfo.slice(5, 7)) < 10) {
    month = dateInfo.slice(6, 7)
  } else {
    month = dateInfo.slice(5, 7)
  }

  if (parseInt(dateInfo.slice(8, 10)) < 10) {
    day = dateInfo.slice(6, 7)
  } else {
    day = dateInfo.slice(5, 7)
  }

  const date = dateInfo.slice(0, 4) + '. ' + month + '. ' + day

  const tempTime = dateInfo.slice(11, 19)
  if (
    parseInt(tempTime.slice(0, 2)) >= 12 &&
    parseInt(tempTime.slice(0, 2)) < 24
  ) {
    noon = '오후 '
  } else {
    noon = '오전 '
  }

  if (
    parseInt(tempTime.slice(0, 2)) > 12 &&
    parseInt(tempTime.slice(0, 2)) < 24
  ) {
    hour = parseInt(tempTime.slice(0, 2)) - 12
  } else {
    hour = parseInt(tempTime.slice(0, 2))
  }

  let minute: number = parseInt(tempTime.slice(3, 5))

  return { date: date /*time: noon + hour + '시 ' + minute + '분'*/ }
}

export default dateParse
