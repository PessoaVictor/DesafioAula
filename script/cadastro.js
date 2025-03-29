document.getElementById("cadastro").addEventListener("submit", function (event) {
    event.preventDefault();
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;

    const usuario = {
        name: nome,
        email: email,
        password: senha,
    };

    localStorage.setItem(email, JSON.stringify(usuario));
    alert("Cadastro feito com sucesso!");
    window.location.href = "login-page.html";
});