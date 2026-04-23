"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const TenantAuthContext = createContext(null);

export function TenantAuthProvider({ children }) {
    const [features, setFeatures] = useState([]);
    const [tenant, setTenant] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('tenant_token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setFeatures(payload.features || []);
            setTenant(payload);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('tenant_token', token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        setFeatures(payload.features || []);
        setTenant(payload);
    };

    const logout = () => {
        localStorage.removeItem('tenant_token');
        setFeatures([]);
        setTenant(null);
    };

    return (
        <TenantAuthContext.Provider value={{ features, tenant, login, logout }}>
            {children}
        </TenantAuthContext.Provider>
    );
}

export const useTenantAuth = () => {
    const context = useContext(TenantAuthContext);
    if (context === null) {
        throw new Error('useTenantAuth must be used inside <TenantAuthProvider>');
    }
    return context;
};
