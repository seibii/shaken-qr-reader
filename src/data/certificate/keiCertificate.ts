import BaseCertificate from './baseCertificate'

export default class KeiCertificate implements BaseCertificate {
    constructor(
      public carIdentifierLocation: string,
      public carTypeNumberAndCategoryNumber: string,
      public expiresAt: string,
      public registeredAt: string,
      public model: string,
      public frontFrontAxleWeight: string,
      public frontRearAxleWeight: string,
      public rearFrontAxleWeight: string,
      public rearRearAxleWeight: string,
      public noiseRegulation: string,
      public emissionNoiseRegulation: string,
      public driveSystem: string,
      public measuredOpacimeter: string,
      public measuredNoxAndPm: string,
      public nox: string,
      public pm: string,
      public fuelType: string,
      public number: string,
      public numberType: string,
      public identifier: string,
      public engineModel: string,
      public sheetType: string,
      // Kei
      public ownerAddress: string, // 使用者住所
      public ownerName: string, // 使用者氏名
      public use: string, // 用途
      public purpose: string, // 自家用事業用の別
      public shape: string, // 車体の形状
      public capacity1: string, // 定員1
      public capacity2: string, // 定員2
      public maxCarrying1: string, // 最大積載量1
      public maxCarrying2: string, // 最大積載量2
      public weight1: string, // 総重量1
      public weight2: string, // 総重量2
      public code: string, // 車名コード
      public mileage: string, // 走行距離計表示値
      public mileageType: string, // 走行距離計区分
    ) {}

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
