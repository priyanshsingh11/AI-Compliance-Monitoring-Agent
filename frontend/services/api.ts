import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const fetchCalendar = async () => {
    const res = await axios.get(`${API_BASE}/regulatory-calendar`);
    return res.data;
};

export const fetchValidations = async () => {
    const res = await axios.get(`${API_BASE}/validation-results`);
    return res.data;
};

export const fetchReport = async () => {
    const res = await axios.get(`${API_BASE}/report`);
    return res.data;
};

export const fetchAuditLog = async () => {
    const res = await axios.get(`${API_BASE}/audit-log`);
    return res.data;
};
