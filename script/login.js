document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;

    var usuario = localStorage.getItem(email);

    if (usuario) {
        var usuarioDigitado = JSON.parse(usuario);
        if (usuarioDigitado.password === senha) {
            localStorage.setItem("user", JSON.stringify(usuarioDigitado));
            window.location.href = "index.html";
        } else {
            alert("Email ou senha incorretos!");
        }
    } else {
        alert("Usuário não encontrado!");
    }
});
