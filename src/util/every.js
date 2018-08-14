export default (fn, gap) => {
	let invocationInterval = gap
  let timeout
	let canceled = false

  const invoke = (...args) => {
    if(timeout) clearTimeout(timeout)
    if(!canceled) timeout = setTimeout(() => invoke(...args), invocationInterval)

  	return fn(...args)
  }

	const interval = (newInterval=gap) => {
		invocationInterval = newInterval
		canceled = false

    return invocationInterval
  }

	const cancel = () => canceled = true

	return {invoke, interval, cancel}
}
