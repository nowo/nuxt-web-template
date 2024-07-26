export enum PrismaKeyType {
    String = 'String',
    Int = 'Int',
    Boolean = 'Boolean',
    DateTime = 'DateTime',
    Float = 'Float',
    Json = 'Json',
    Decimal = 'Decimal',
    BigInt = 'BigInt',
    Enum = 'Enum',
    Id = 'Id',
    UUID = 'UUID',
    Date = 'Date',
    Jsonb = 'Jsonb',
    Text = 'Text',
    Bytes = 'Bytes',
    Unsigned = 'Unsigned',
    UnsignedInt = 'UnsignedInt',
    UnsignedBigInt = 'UnsignedBigInt',
    UnsignedSmallInt = 'UnsignedSmallInt',
}

export interface PrismaListItem {
    model: string // 模型名称
    description: string // 描述
    name: string // 表名
    list: {
        key: string // 字段名
        type: PrismaKeyType // 字段类型
        description: string // 字段描述
        defaultValue: string // 字段默认值
        isRequired: boolean // 是否必填
        isUnique: boolean // 是否唯一
        isId: boolean // 是否是主键
        length: number // 字段长度
        isRelation: boolean // 是否是关联表
        relationModel: string // 关联表名
        relationField: string // 关联字段名
        relationType: PrismaKeyType // 关联字段类型
    }[]
}
