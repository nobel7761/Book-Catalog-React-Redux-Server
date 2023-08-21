"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortHelpers = void 0;
const calculateSorting = (options) => {
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    return {
        sortBy,
        sortOrder,
    };
};
exports.sortHelpers = {
    calculateSorting,
};
