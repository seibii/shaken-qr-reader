import BaseCertificate from './baseCertificate'

export default class KeiOldCertificate implements BaseCertificate {
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
        public sheetType: string
    ) {}

    get encodedStrings (): string[] {
        return [
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
