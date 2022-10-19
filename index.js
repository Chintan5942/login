function getupadate() {
    if (localStorage.getItem('user_data') == null) {
        let login = [];
        localStorage.setItem("user_data", JSON.stringify(login))
    }
    else {
        login = JSON.parse(localStorage.getItem('user_data'))
    }
}

var submit_m = document.getElementById('submit_m');
if (submit_m) {
    submit_m.addEventListener('click', update)
}
function update() {

    let pass = document.getElementById('password').value;
    let username = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    var filter = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (localStorage.getItem('user_data') == null) {
        if (pass != "" && username != "" && email != "") {
            if (filter.test(email)) {
                login = [];
                login.push({ id: new Date().getTime().toString().slice(9, 12), "email": email, "username": username, "pass": pass, })
                localStorage.setItem("user_data", JSON.stringify(login))
                document.getElementById('password').value = "";
                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                window.location.href = "login.html"
            }
            else {
                console.log("error")
                alert("enter valid email");
                document.getElementById('password').value = "";
                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
            }

        }
    }
    else {
        if (pass != "" && username != "" && email != "" && filter.test(email)) {
            let login = JSON.parse(localStorage.getItem('user_data'));
            if (login.some(ele => { return ele.email == email })) {
                alert("data already in xyz");
                document.getElementById('password').value = "";
                document.getElementById('name').value = "";
                document.getElementById('email').value = ""
            }

            else {
                let login = JSON.parse(localStorage.getItem('user_data'));
                login.push({ id: new Date().getTime().toString().slice(9, 12), "email": email, "username": username, "pass": pass, })
                localStorage.setItem("user_data", JSON.stringify(login))
                document.getElementById('password').value = "";
                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                window.location.href = "login.html"
            }
        }
        else {
            alert("enter valid email");
            document.getElementById('password').value = "";
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
        }
    }
}

var sub = document.getElementById('sub');
let set_edit;
if (sub) {
    sub.addEventListener('click', (e) => {
        e.preventDefault()
        let login_deteil =new Array;
        
        pass = document.getElementById('correct_p').value;
        email = document.getElementById('correct_e').value;
        let login = JSON.parse(localStorage.getItem('user_data'));
         if(login.some((i)=>{return i.email==email&&i.pass==pass}))
            {
                login_deteil=(login.filter((i)=>{return i.email==email&&i.pass==pass}))
                localStorage.setItem("c_login",JSON.stringify(login_deteil));
                console.log(login_deteil);
                window.location.href="edit.html";
            }
            else {
                    alert("Enter Email And Password");
                   
                }
          
        
    })
}
let logout = document.getElementById('logout')
if (logout) {
    logout.addEventListener('click', () => {
        // set_edit = false;
        window.location.href = "index.html"
        // console.log(set_edit);
        localStorage.removeItem("c_login")
    })
}
let edit = document.getElementById('edit')
if (edit) {
    edit.addEventListener('click', () => {
        let old = document.getElementById("oldpass");
        let newe = document.getElementById("newpass");
        let submit_e = document.getElementById('submit_e')
        let lbl_o = document.getElementById("lbl_o");
        let lbl_n = document.getElementById("lbl_n");
        old.style.display = "block";
        newe.style.display = "block";
        submit_e.style.display = "block";
        lbl_o.style.display = "block";
        lbl_n.style.display = "block";
    })
}
let submit_e = document.getElementById("submit_e");
if (submit_e) {
    let ary = [];
    submit_e.addEventListener('click', () => {
        let newe = document.getElementById('newpass').value;
        let login_deteil =JSON.parse(localStorage.getItem('c_login'))
        let id = login_deteil[0].id;
        console.log(login_deteil);
        let old_pwd = document.getElementById("oldpass").value;
        let data = login_deteil.filter(ele => {
            return ele.id == id;
        })
        ary = data;
        console.log(data)
        login_deteil.filter(ele => {
            if (ele.pass == old_pwd) {
                if (old_pwd != "" && newe!= "") {
                    data[0].pass = newe;
                    ele.pass = data[0].pass;
                    console.log(data[0]);
                    localStorage.setItem('c_login', JSON.stringify(login_deteil))
                    alert('Password Successfully Changed')
                    document.getElementById('newpass').value = "";
                    document.getElementById("oldpass").value = "";
                }
            }
            else {
                alert("Old password not match")
            }
        })
        old = JSON.parse(localStorage.getItem('user_data'))
        console.log(old)
        console.log(ary);
        old.map(ele => {
            if (ele.id == ary[0].id) {
                if (ele.pass == old_pwd) {
                    ele.id = login_deteil[0].id;
                    ele.pass = login_deteil[0].pass;
                    ele.email = login_deteil[0].email;
                    ele.username = login_deteil[0].username;
                    localStorage.setItem("user_data", JSON.stringify(old))
                    document.getElementById('newpass').value = "";
                    document.getElementById("oldpass").value = "";
                    document.getElementById("oldpass").style.display = "none";
                    document.getElementById('newpass').style.display = "none";
                    document.getElementById("submit_e").style.display = "none";
                    document.getElementById("lbl_o").style.display = "none";
                    document.getElementById("lbl_n").style.display = "none";
                    window.location.href = "index.html"
                    localStorage.removeItem("c_login")
                }
            }
        })
    })
}

