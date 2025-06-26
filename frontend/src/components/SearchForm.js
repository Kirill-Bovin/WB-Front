import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SearchForm = ({ searchQuery, setSearchQuery, limit, setLimit, onSearch, }) => {
    return (_jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            onSearch();
        }, className: "flex flex-col md:flex-row gap-4 mb-6", children: [_jsx("input", { type: "text", placeholder: "\u041F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "border px-4 py-2 rounded w-full md:w-auto" }), _jsx("input", { type: "number", min: 1, max: 1000, value: limit, onChange: (e) => setLimit(Number(e.target.value)), className: "border px-4 py-2 rounded w-full md:w-32" }), _jsx("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded", children: "\u041F\u0430\u0440\u0441\u0438\u0442\u044C" })] }));
};
export default SearchForm;
