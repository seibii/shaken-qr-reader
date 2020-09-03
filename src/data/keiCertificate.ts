import BaseCertificate from './baseCertificate'

export default class KeiCertificate implements BaseCertificate {
    // Base
    carIdentifierLocation: string
    carTypeNumberAndCategoryNumber: string
    expiresAt: string
    registeredAt: string
    model: string
    frontFrontAxleWeight: string
    frontRearAxleWeight: string
    rearFrontAxleWeight: string
    rearRearAxleWeight: string
    noiseRegulation: string
    emissionNoiseRegulation: string
    driveSystem: string
    measuredOpacimeter: string
    measuredNoxAndPm: string
    nox: string
    pm: string
    fuelType: string
    number: string
    numberType: string
    identifier: string
    engineModel: string
    sheetType: string

    // Kei
    ownerAddress: string // 使用者住所
    ownerName: string // 使用者氏名
    use: string // 用途
    purpose: string // 自家用事業用の別
    shape: string // 車体の形状
    capacity1: string // 定員1
    capacity2: string // 定員2
    maxCarrying1: string // 最大積載量1
    maxCarrying2: string // 最大積載量2
    weight1: string // 総重量1
    weight2: string // 総重量2
    code: string // 車名コード
    mileage: string // 走行距離計表示値
    mileageType: string // 走行距離計区分

    constructor (qrCodes: string[][]) {
      this.fuelType = ''

      // QR1
      // qrCodes[0][0]; K
      // qrCodes[0][1]; 71
      // qrCodes[0][2]; 種別 軽自動車固定
      this.use = qrCodes[0][3]
      this.purpose = qrCodes[0][4]
      this.shape = qrCodes[0][5]
      this.capacity1 = qrCodes[0][6]
      this.capacity2 = qrCodes[0][7]
      this.maxCarrying1 = qrCodes[0][8]
      this.maxCarrying2 = qrCodes[0][9]
      this.weight1 = qrCodes[0][10]
      this.weight2 = qrCodes[0][11]
      this.code = qrCodes[0][12]
      this.mileage = qrCodes[0][13]
      this.mileageType = qrCodes[0][14]

      // QR2
      // qrCodes[1][0]; K
      // qrCodes[1][1]; 61
      this.ownerAddress = qrCodes[1][2]

      // QR3
      // qrCodes[2][0]; K
      // qrCodes[2][1]; 51
      this.ownerName = qrCodes[2][2]

      // QR4
      // qrCodes[3][0]; K
      // qrCodes[3][1]; 31
      this.carIdentifierLocation = qrCodes[3][2]
      this.carTypeNumberAndCategoryNumber = qrCodes[3][3]
      this.expiresAt = qrCodes[3][4]
      this.registeredAt = qrCodes[3][5]
      this.model = qrCodes[3][6]
      this.frontFrontAxleWeight = qrCodes[3][7]
      this.frontRearAxleWeight = qrCodes[3][8]
      this.rearFrontAxleWeight = qrCodes[3][9]
      this.rearRearAxleWeight = qrCodes[3][10]
      this.noiseRegulation = qrCodes[3][11]
      this.emissionNoiseRegulation = qrCodes[3][12]
      this.driveSystem = qrCodes[3][13]
      this.measuredOpacimeter = qrCodes[3][14]
      this.measuredNoxAndPm = qrCodes[3][15]
      this.nox = qrCodes[3][16]
      this.pm = qrCodes[3][17]

      // QR5
      // qrCodes[4][0]; K
      // qrCodes[4][1]; 22
      this.number = qrCodes[4][2]
      this.numberType = qrCodes[4][3]
      this.identifier = qrCodes[4][4]
      this.engineModel = qrCodes[4][5]
      this.sheetType = qrCodes[4][6]

      // QR6
      // console.log(qrCodes[5]);
    }

    get encodedStrings (): string[] {
      return [
        [
          'K',
          '71',
          '軽自動車',
          this.use,
          this.purpose,
          this.shape,
          this.capacity1,
          this.capacity2,
          this.maxCarrying1,
          this.maxCarrying2,
          this.weight1,
          this.weight2,
          this.code,
          this.mileage,
          this.mileageType
        ].join('/'),
        [
          'K',
          '61',
          this.ownerAddress
        ].join('/'),
        [
          'K',
          '51',
          this.ownerName
        ].join('/'),
        [
          'K',
          '31',
          this.carIdentifierLocation,
          this.carTypeNumberAndCategoryNumber,
          this.expiresAt,
          this.registeredAt,
          this.model,
          this.frontFrontAxleWeight,
          this.frontRearAxleWeight,
          this.rearFrontAxleWeight,
          this.rearRearAxleWeight,
          this.noiseRegulation,
          this.emissionNoiseRegulation,
          this.driveSystem,
          this.measuredOpacimeter,
          this.measuredNoxAndPm,
          this.nox,
          this.pm,
          '999999'
        ].join('/'),
        [
          'K',
          '22',
          this.number,
          this.numberType,
          this.identifier,
          this.engineModel,
          this.sheetType
        ].join('/')
      ]
    }
}
