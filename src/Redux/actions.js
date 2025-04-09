
export const login = (userRole) => ({
    type: 'LOGIN',
    payload: userRole
});

export const logout = () => ({
    type: 'LOGOUT',
});
