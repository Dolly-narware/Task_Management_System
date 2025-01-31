

const logout = () => {
    localStorage.removeItem("token");
};

const getToken = () => localStorage.getItem("token");

export {  logout, getToken };

