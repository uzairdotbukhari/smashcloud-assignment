export interface TollDetailsProps {
    type: "edit" | "add"
}

export interface InputFieldProps {
    name: string,
    type: "text" | "number" | "datetime-local",
    title: string,
    palceholder?: string,
    defaultValue?: string | number,
    onChange?: () => void,
    register?: any,
    disabled?: boolean
}

export interface InputSelectProps {
    name: string,
    title: string,
    defaultValue?: string | number,
    onChange?: () => void,
    register?: any
}

export interface CostSummary {
    baseRate: number | null,
    totalKMs: number | null,
    subTotal: number | null,
    discount: number | null,
    total: number | null
}
