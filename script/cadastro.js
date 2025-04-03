document.getElementById("cadastro").addEventListener("submit", function (event) {
    event.preventDefault();
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("password").value;

    const usuario = {
        name: nome,
        email: email,
        password: senha,
    };
    
    let listaCadastro = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
    console.log(listaCadastro, usuario);
    listaCadastro.push(usuario);
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaCadastro));
    alert("Cadastro feito com sucesso!");
    window.location.href = "login-page.html";
});