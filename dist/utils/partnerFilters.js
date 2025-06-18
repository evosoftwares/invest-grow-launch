export const filterPartners = (partners, searchTerm, statusFilter) => {
    return partners.filter(partner => {
        var _a, _b;
        const partnerName = ((_a = partner.profiles) === null || _a === void 0 ? void 0 : _a.full_name) || partner.business_name || '';
        const partnerEmail = ((_b = partner.profiles) === null || _b === void 0 ? void 0 : _b.email) || '';
        const matchesSearch = partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            partnerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
};
