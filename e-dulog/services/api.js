// services/api.js
const API_URL = "http://10.10.19.221:8000"; // replace with your PC's local IP and FastAPI port

// --------------------
// Signup function
// --------------------
export async function signup(name, email, password, house_number, municipality, barangay) {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,          // matches UserCreate in FastAPI
        email,
        password,
        house_number,
        municipality,
        barangay
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Signup failed");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

// --------------------
// Submit a report
// --------------------
export async function submitReport(reportData) {
  try {
    const response = await fetch(`${API_URL}/reports/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Report submission failed");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

// --------------------
// Get all reports
// --------------------
export async function getReports() {
  try {
    const response = await fetch(`${API_URL}/reports/`);
    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
}