export const getHeaders = (keycloak) => {
    return {
        headers: {
            Authorization: `Bearer ${keycloak.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        withCredentials: true
    }
}
