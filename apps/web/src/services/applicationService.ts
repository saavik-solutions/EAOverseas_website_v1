const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const applicationService = {
    getByUniversity: async (universityId: string) => {
        const res = await fetch(`${API_BASE}/api/applications/university/${universityId}`);
        return handleResponse(res, 'Failed to fetch applications');
    },

    getAnalytics: async (universityId: string) => {
        const res = await fetch(`${API_BASE}/api/applications/university/${universityId}/analytics`);
        return handleResponse(res, 'Failed to fetch analytics');
    },

    updateStatus: async (applicationId: string, status: string, notes?: string) => {
        const res = await fetch(`${API_BASE}/api/applications/${applicationId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, notes })
        });
        return handleResponse(res, 'Failed to update application');
    }
};

async function handleResponse(res: Response, fallbackError: string) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || data.message || fallbackError);
        }
        return data;
    } else {
        const text = await res.text();
        if (!res.ok) {
            throw new Error(`${fallbackError} (Server returned ${res.status})`);
        }
        return { message: text };
    }
}
