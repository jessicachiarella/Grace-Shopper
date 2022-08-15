const API_URL = "http://localhost:4000/api";

export async function LoginPerson(event) {
    try {
        const loginEmail = event.target[0].value;
        const loginPassword = event.target[1].value;
        const response = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        });
        const result = await response.json();
        return result;
      
    } catch (error) {
        throw error
    }
}
