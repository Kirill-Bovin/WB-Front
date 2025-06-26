import { jsx as _jsx } from "react/jsx-runtime";
export function Slider({ min, max, value, onChange, }) {
    return (_jsx("input", { type: "range", min: min, max: max, value: value, onChange: (e) => onChange(Number(e.target.value)), className: "w-full" }));
}
