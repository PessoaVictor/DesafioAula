document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let senha = document.getElementById("password").value;
    let mensagemErro = '';

    let listaCadastro = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
    let login = JSON.parse(sessionStorage.getItem('usuarioLogado')) || [];

    listaCadastro.forEach(element => {
        if (element.email === email && element.password === senha) {
            if(login.length>0){
                login = []
            }

            mensagemErro = 'ok'
            let emailDigitado = element.email;
            let passwordDigitado = element.password;

                let loginDados = {
                    email: emailDigitado,
                    senha: passwordDigitado
                }
                
                login.push(loginDados);
                sessionStorage.setItem("usuarioLogado", JSON.stringify(login));
                window.location.href = "index.html";
        }
       
    });
    if(mensagemErro !== 'ok'){
        alert("Email ou senha incorretos!");
    }
    
});