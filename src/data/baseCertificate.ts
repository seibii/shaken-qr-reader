export default interface BaseCertificate {
    carIdentifierLocation: string // 車台番号打刻位置
    carTypeNumberAndCategoryNumber: string // 型式指定番号 + 類別区分番号
    expiresAt: string // 車検証 有効期限の満了する日
    registeredAt: string // 初度登録年月
    model: string // 型式
    frontFrontAxleWeight: string, // 前前軸重
    frontRearAxleWeight: string, // 前後軸重
    rearFrontAxleWeight: string, // 後前軸重
    rearRearAxleWeight: string, // 後後軸重
    noiseRegulation: string // 騒音規制
    emissionNoiseRegulation: string // 近接排気騒音規制値
    driveSystem: string // 駆動方式
    measuredOpacimeter: string // オパシメーター測定車
    measuredNoxAndPm: string // NOx・PM測定モード
    nox: string // NOx値
    pm: string // PM値
    fuelType: string // 燃料種類
    number: string // 自動車登録番号または車両番頭
    numberType: string // 標板の枚数・大きさ
    identifier: string // 車台番号
    engineModel: string // 原動機の型式
    sheetType: string // 帳票種別

    // Property
    encodedStrings: string[]
}
