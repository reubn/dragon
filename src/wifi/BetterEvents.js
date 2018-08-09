import EventEmitter from 'eventemitter3'

export default class BetterEvents extends EventEmitter {
  events = {
    all: Symbol('all')
  }

  emit(eventName, ...args){
    super.emit(this.events.all, eventName, ...args)
    return super.emit(eventName, ...args)
  }
}
