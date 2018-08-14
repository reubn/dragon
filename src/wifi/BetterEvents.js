import EventEmitter from 'events'

export default class BetterEvents extends EventEmitter {
  events = {
    all: Symbol('all')
  }

  emit(eventName, ...args){
    if(['newListener', 'removeListener'].includes(eventName)) return super.emit(eventName, ...args)

    super.emit(this.events.all, eventName, ...args)
    return super.emit(eventName, ...args)
  }
}
