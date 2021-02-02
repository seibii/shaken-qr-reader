export type CarType = 'normal' | 'kei' | 'kei_old'

export class InvalidQRCode extends Error {
  constructor (e?: string) {
    super(e)
    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
export class ReadQRCode extends Error {
  constructor (e?: string) {
    super(e)
    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
