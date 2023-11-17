export const getSelectType = (data = [], valueKey, labelKey) => {
    return data.map((d) => ({
        label: d[labelKey],
        value: d[valueKey],
    }))
}