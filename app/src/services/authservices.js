export const login = async ({ dni, clave }) => {
    const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni, clave }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw { status: response.status, message: data.message };
    }

    if (!data.token) {
        throw { message: "No se recibió token del servidor" };
    }

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userId", data.user);
    localStorage.setItem("rol", data.rol);

    return data;
};

export const logout = () => {
    localStorage.clear();
    window.location.href = "/";
};

