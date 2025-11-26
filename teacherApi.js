const API_BASE = "http://localhost:5000/api"; // backend base URL

const request = async (url, method = "GET", body = null) => {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null
    });
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return { success: false, message: err.message };
  }
};

export const teacherApi = {
  // AUTH
  signup: (data) => request("/signup", "POST", data),  // MUST match backend
  login: (data) => request("/login", "POST", data),    // MUST match backend

  // STUDENTS
  getStudents: () => request("/students"),
  createStudent: (data) => request("/students", "POST", data),
  deleteStudent: (id) => request(`/students/${id}`, "DELETE"),

  // HOMEWORK
  getHomeworks: () => request("/homework"),
  createHomework: (data) => request("/homework", "POST", data),
};
