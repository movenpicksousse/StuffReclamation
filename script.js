// =============================
// CONNEXION SUPABASE
// =============================
const supabaseUrl = "https://xtahersjyepgvbxojpld.supabase.co";
const supabaseKey = "sb_publishable_iBqcaF-f6otVAETbbHdf_g_en8_62t9";

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase connecté");

function showMessage(msg, color) {
    let message = document.getElementById("message");
    message.textContent = msg;
    message.style.color = color;
}

async function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if (!username || !password) {
        showMessage("Remplis tous les champs", "red");
        return;
    }

    const { data: usersFound, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password);

    if (error) {
        console.error(error);
        showMessage("Erreur de connexion", "red");
        return;
    }

    if (usersFound.length === 0) {
        showMessage("Identifiants incorrects", "red");
        return;
    }

    const user = usersFound[0];

    localStorage.setItem("username", user.username);
    localStorage.setItem("department", user.department);

    console.log("Utilisateur connecté :", user.username);
    console.log("Département :", user.department);

    showMessage("Connexion réussie", "green");

    setTimeout(() => {
        window.location.href = "employee.html";
    }, 1000);
}