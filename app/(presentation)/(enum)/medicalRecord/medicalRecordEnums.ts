export enum MedicalRecordCategoriesEnum {
    RECORDS = "ANTECEDENTES",
    PHYSICAL = "FISICO",
    ORDERS = "ORDENES",
}

export enum MedicalRecordCategoriesIdEnum {
    RECORDS = 1,
    PHYSICAL = 2,
    ORDERS = 3,
}

export enum MedicalRecordTypesEnum {
    ALLERGIES = "ALLERGIES",
    SURGICAL_INTERVENTIONS = "SURGICAL_INTERVENTIONS",
    TAKE_MEDICATIONS = "TAKE_MEDICATIONS",
    TRANSFUSIONS = "TRANSFUSIONS",
    ANEMIA = "ANEMIA",
    ARTHRITIS = "ARTHRITIS",
    ASMA = "ASMA",
    CANCER = "CANCER",
    BLOODS_CLOTS = "BLOODS_CLOTS",
    COLITIS = "COLITIS",
    BLOOD_TYPE = "BLOOD_TYPE",
    SMOKING = "SMOKING",
    ALCOCHOLIC_BEVERAGES = "ALCOCHOLIC_BEVERAGES",
    DRUGS = "DRUGS",
    EXERCISE = "EXERCISE",
    COVID = "COVID",
    DIABETES = "DIABETES",
    CANCER_FAMILY = "CANCER_FAMILY",
    HIPERTENSION = "HIPERTENSION",
    SIDA = "SIDA",
    OTHER = "OTHER",
}

export enum MedicalRecordTypesNumberEnum {
    ALLERGIES = 1,
    SURGICAL_INTERVENTIONS = 2,
    TAKE_MEDICATIONS = 3,
    TRANSFUSIONS = 4,
    ANEMIA = 5,
    ARTHRITIS = 6,
    ASMA = 7,
    CANCER = 8,
    BLOODS_CLOTS = 9,
    COLITIS = 10,
    BLOOD_TYPE = 11,
    SMOKING = 12,
    ALCOCHOLIC_BEVERAGES = 13,
    DRUGS = 14,
    EXERCISE = 15,
    COVID = 16,
    DIABETES = 17,
    CANCER_FAMILY = 18,
    HIPERTENSION = 19,
    SIDA = 20,
    OTHER = 21
}

export enum MedicalRecordValueTypesEnum {
    ALLERGIES_NAME = "NAME",
    SURGICAL_INTERVENTIONS_NAME = "NAME",
    SURGICAL_INTERVENTIONS_YEAR = "YEAR",
    TAKE_MEDICATIONS_NAME = "NAME",
    TAKE_MEDICATIONS_DATE = "DATE",
    TRANSFUSIONS_DESCRIPTION = "DESCRIPTION",
    ANEMIA_DESCRIPTION = "DESCRIPTION",
    ARTHRITIS_DESCRIPTION = "DESCRIPTION",
    ASMA_DESCRIPTION = "DESCRIPTION",
    CANCER_DESCRIPTION = "DESCRIPTION",
    BLOODS_CLOTS_DESCRIPTION = "DESCRIPTION",
    COLITIS_DESCRIPTION = "DESCRIPTION",
    BLOOD_TYPE_NAME = "NAME",
    SMOKING_DESCRIPTION = "DESCRIPTION",
    ALCOCHOLIC_BEVERAGES_DESCRIPTION = "DESCRIPTION",
    DRUGS_DESCRIPTION = "DESCRIPTION",
    EXERCISE_DESCRIPTION = "DESCRIPTION",
    COVID_DESCRIPTION = "DESCRIPTION",
    DIABETES_FAMILY = "FAMILY",
    CANCER_FAMILY = "FAMILY",
    HIPERTENSION_FAMILY = "FAMILY",
    SIDA_FAMILY = "FAMILY",
    OTHER_FAMILY = "FAMILY"
}

export enum MedicalRecordTypesPhysicalEnum {
    ABNORMAL_APPEREANCE = "ABNORMAL_APPEREANCE",
    DISNEA = "DISNEA",
    DEFORMITY = "DEFORMITY",
    AMPUTATION = "AMPUTATION",
    PARALISYS = "PARALISYS",
    ABNORMAL_MOVEMENTS = "ABNORMAL_MOVEMENTS",
    ABNORMAL_GAIT = "ABNORMAL_GAIT",
    MENTAL_DISORDER = "MENTAL_DISORDER",
    ABNORMALITY = "ABNORMALITY",
    ANATOMICAL_STATE_EYES = "ANATOMICAL_STATE_EYES",
    EYE_VISION = "EYE_VISION",
    HEARING_EARS = "HEARING_EARS",
    BUCCAL_PHARYNX = "BUCCAL_PHARYNX",
    NECK = "NECK",
    CHEST = "CHEST",
    SPINE = "SPINE",
    ABDOMEN = "ABDOMEN",
    EXTREMITIES = "EXTREMITIES",
    SMOKING_PHYSICAL = "SMOKING_PHYSICAL",
}

export enum MedicalRecordValueTypesPhysicalEnum {
    ABNORMAL_APPEREANCE_DESCRIPTION = "DESCRIPTION",
    DISNEA_DESCRIPTION = "DESCRIPTION",
    DEFORMITY_DESCRIPTION = "DESCRIPTION",
    AMPUTATION_DESCRIPTION = "DESCRIPTION",
    PARALISYS_DESCRIPTION = "DESCRIPTION",
    ABNORMAL_MOVEMENTS_DESCRIPTION = "DESCRIPTION",
    ABNORMAL_GAIT_DESCRIPTION = "DESCRIPTION",
    MENTAL_DISORDER_DESCRIPTION = "DESCRIPTION",
    ABNORMALITY_DESCRIPTION = "DESCRIPTION",
    ANATOMICAL_STATE_EYES_DESCRIPTION = "DESCRIPTION",
    EYE_VISION_DESCRIPTION = "DESCRIPTION",
    HEARING_EARS_DESCRIPTION = "DESCRIPTION",
    BUCCAL_PHARYNX_DESCRIPTION = "DESCRIPTION",
    NECK_DESCRIPTION = "DESCRIPTION",
    CHEST_DESCRIPTION = "DESCRIPTION",
    SPINE_DESCRIPTION = "DESCRIPTION",
    ABDOMEN_DESCRIPTION = "DESCRIPTION",
    EXTREMITIES_DESCRIPTION = "DESCRIPTION",
    SMOKING_PHYSICAL_DESCRIPTION = "DESCRIPTION",
}

export enum MedicalRecordTypesOrdersEnum {
    ORDER_LABORATORY = "ORDER_LABORATORY",
    ORDER_DIAGNOSIS = "ORDER_DIAGNOSIS",
    ORDER_SPECIALTY = "ORDER_SPECIALTY",
    ORDER_MEDICAL_PROOF = "ORDER_MEDICAL_PROOF",
    ORDER_MEDICAL_CERTIFICATE = "ORDER_MEDICAL_CERTIFICATE",
    ORDER_HOSPITALIZATION = "ORDER_HOSPITALIZATION",
    ORDER_OPENING = "ORDER_OPENING"
}

export enum MedicalRecordValueTypesOrdersEnum {
    ORDER_LABORATORY_MEDICAL_EXAM = "MEDICAL_EXAM",
    ORDER_LABORATORY_INDICATION = "INDICATION",
    ORDER_DIAGNOSIS_MEDICAL_EXAM = "MEDICAL_EXAM",
    ORDER_DIAGNOSIS_INDICATION = "INDICATION",
    ORDER_SPECIALTY = "SPECIALTY",
    ORDER_SPECIALTY_DOCTOR_NAME = "DOCTOR_NAME",
    ORDER_SPECIALTY_OTHER_DOCTOR_NAME = "OTHER_DOCTOR_NAME",
    ORDER_MEDICAL_PROOF = "MEDICAL_PROOF",
    ORDER_MEDICAL_CERTIFICATE = "MEDICAL_CERTIFICATE",
    ORDER_HOSPITALIZATION = "HOSPITALIZATION",
    ORDER_OPENING = "OPENING",
}

type TMedicalRecordTypeEnum = {
    [key: string]: string
}

export const medicalRecordTypeEnum: TMedicalRecordTypeEnum = {
    "ALLERGIES": "Alergia",
    "SURGICAL_INTERVENTIONS": "Intervención quirurgica",
    "TAKE_MEDICATIONS": "Medicamentos",
    "TRANSFUSIONS": "Transfusiones",
    "ANEMIA": "Anemia",
    "ARTHRITIS": "Artritis",
    "ASMA": "Asma",
    "CANCER": "Cáncer",
    "BLOODS_CLOTS": "Coágulos sanguíneos",
    "COLITIS": "Colitis",
    "BLOOD_TYPE": "Grupo sanguíneo y RH",
    "SMOKING": "Tabaquismo",
    "ALCOCHOLIC_BEVERAGES": "Bebidas alcoholicas",
    "DRUGS": "Drogas",
    "EXERCISE": "Ejercicio",
    "COVID": "COVID",
    "DIABETES": "Diabetes",
    "CANCER_FAMILY": "Cáncer en la familia",
    "HIPERTENSION": "Hipertensión",
    "SIDA": "Sida",
    "OTHER": "Otros antecedentes"
}

type TMedicalRecordTypePhysicalEnum = {
    [key: string]: string
}

export const medicalRecordTypePhysicalEnum: TMedicalRecordTypePhysicalEnum = {
    "ABNORMAL_APPEREANCE": "¿Existe alguna anormalidad en su aspecto?",
    "DISNEA": "¿Existe disnea?",
    "DEFORMITY": "¿Existe alguna deformidad?",
    "AMPUTATION": "¿Falta algún miembro o parte de él?",
    "PARALISYS": "¿Hay parálisis o paresias?",
    "ABNORMAL_MOVEMENTS": "¿Hay movimientos anormales?",
    "ABNORMAL_GAIT": "¿La marcha es anormal?",
    "MENTAL_DISORDER": "¿Se aprecia algún transtorno psíquico?",
    "ABNORMALITY": "¿Existe cualquier anormalidad?",
    "ANATOMICAL_STATE_EYES": "En el estado anatómico de los ojos",
    "EYE_VISION": "En la visión de cada ojo",
    "HEARING_EARS": "En la audición de cada oído",
    "BUCCAL_PHARYNX": "En la cavidad bucal y la faringe",
    "NECK": "En el cuello (ganglios, tiroides, ingurgitación yugular, arterias)",
    "CHEST": "En el tórax (inspección, auscultación)",
    "SPINE": "En la columna vertebral (deformidad, dolor, limitación)",
    "ABDOMEN": "En el abdomen (inspeccion, palpación, dolor, visceromeglias, ascitis)",
    "EXTREMITIES": "En las extremidades (várices, úlceras, edema, articulaciones, arterias, reflejo patelar)",
    "SMOKING_PHYSICAL": "¿Existe algún dato en el aliento, dientes, dedos del solicitante que señale que fume?",
}

type TMedicalRecordTypeOrderEnum = {
    [key: string]: string
}

export const medicalRecordTypeOrderEnum: TMedicalRecordTypeOrderEnum = {
    "ORDER_LABORATORY": "Laboratorio",
    "ORDER_DIAGNOSIS": "Estudio diagnóstico",
    "ORDER_SPECIALTY": "Especialista",
    "ORDER_MEDICAL_PROOF": "Justificativo médico",
    "ORDER_MEDICAL_CERTIFICATE": "Certificado médico",
    "ORDER_HOSPITALIZATION": "Hospitalización",
    "ORDER_OPENING": "Abierta",
}

export enum MedicalRecordStatusEnum {
    ACTIVE = 1,
    APPROVED = 2,
    PENDING = 3,
    DISABLED = 4,
    DELETED = 5,
    INCOMPLETE = 6,
    COMPLETE = 7,
    AVAILABLE = 8,
    NOT_AVAILABLE = 9,
    PROCESSING = 10,
    CANCELED = 11,
}