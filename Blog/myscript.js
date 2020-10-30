function printError(element, msg) {
    document.getElementById(element).innerHTML = msg;
}

function validateError(inputValue, validationRegex, inputString, errorElementName) {
    if (inputValue == '') {
        printError(errorElementName, `Please enter your ${inputString}`);
    } else {
        var regex = validationRegex;
        if (regex.test(inputValue) === false) {
            printError(errorElementName, `Please enter a valid ${inputString}`);
        } else {
            printError(errorElementName, "");
            return false;
        }
    }

    return true;
}

function validateForm() {
    var name = document.contactForm.name.value;
    var lastName = document.contactForm.lastName.value;
    var email = document.contactForm.email.value;
    var mobile = document.contactForm.mobile.value;
    var country = document.contactForm.country.value;
    var message = document.contactForm.message.value;

    var lastNameErr=nameErr=emailErr=mobileErr=countryErr=genderErr=messageErr=true;
    
    nameErr = validateError(name, /^[a-zA-z\s]+$/, "first name", "nameErr");
    lastNameErr = validateError(lastName, /^[a-zA-z\s]+$/, "last name", "lastNameErr");
    emailErr = validateError(email, /^\S+@\S+\.\S+$/, "email", "emailErr");
    mobileErr = validateError(mobile, /^[0-9]+$/, "mobile number", "mobileErr");
    countryErr = validateError(country, /^(?!Select).*$/, "country", "countryErr");
    messageErr = validateError(message, /\S+/, "message", "messageErr");
    if (nameErr || lastNameErr || emailErr || mobileErr || countryErr || messageErr) {
        return false;
    } else {
        alert('You have submitted the form');
    }
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
}

function blogSubmit() {
    var title = document.getElementById("titleInput").value;
    var author = document.getElementById("authorInput").value;
    var text = document.getElementById("textInput").value;
    var titleErr = document.getElementById("titleErr");
    var textErr = document.getElementById("textErr");
    
    /* Validate submission form */
    if (title == "") {
        titleErr.style.display = "block";
    } else {
        titleErr.style.display = "none";
    }

    if (author == "") {
        author = "Unknown";
    } 

    if (text == "") {
        textErr.style.display = "block";
    } else {
        textErr.style.display = "none";
    }

    if (title != "" && text != "") {
        var parentNode = document.getElementById("blogPosts");
        var blogInnerHtml = 
        `<div class="singlePost">
              <br>
              <div class="card">
              <div class="card-body">
                <div class="row title-row">
                  <div class="col-4"><h1 class="blogTitle">${title}</h1></div>
                  <div class="col-4"></div>
                  <div class="col-2"></div>
                  <div class="col-2"><button onclick="blogEditToggle(this)" class="btn btn-sm btn-info m-1">Edit</button> <button onclick="blogDelete(this)" class="btn btn-sm btn-danger m-1">Delete</button></div>
                </div>
              
              <i class="text-muted">by ${author}</i><br/><br/>
              <p class="blogText">${text}</p>
  
              
  
  
                <div class="editForm" style="display:none">
                <h4>Edit this blog post</h4>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" placeholder="Enter a Title" value="${title}">
                </div>
                
                <div class="form-group">
                    <label>Text</label>
                    <textarea rows="4" class="form-control" id="textInput" placeholder="Enter text">${text}</textarea>
                </div>
  
                <button onclick="blogEdit(this)" class="btn btn-lg btn-primary">Submit</button>
              </div>
              </div>    
              </div>
              </div>`
        

        var element = createElementFromHTML(blogInnerHtml);
        parentNode.prepend(element);
    }
}

function blogDelete(blogElement) {
    blogElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
}

function blogEditToggle(blogElement) {
    var curTitle = blogElement.parentElement.parentElement.getElementsByTagName("div")[0].getElementsByClassName("blogTitle")[0].innerHTML;
    var curText = blogElement.parentElement.parentElement.parentElement.getElementsByClassName("blogText")[0].innerHTML;
    var editForm = blogElement.parentElement.parentElement.parentElement.getElementsByClassName("editForm")[0];
    var editFormTitle = editForm.getElementsByTagName("div")[0].getElementsByTagName("input")[0];
    var editFormText = editForm.getElementsByTagName("div")[1].getElementsByTagName("textarea")[0];
    if (editForm.style.display=="none") {
        editForm.style.display="block";
        editFormTitle.value = curTitle;
        editFormText.value = curText;
    } else {
        editForm.style.display="none";
    }
}

function blogEdit(blogElement) {
    var titleElement = blogElement.parentElement.parentElement.getElementsByTagName("div")[0].getElementsByTagName("h1")[0];
    var textElement = blogElement.parentElement.parentElement.getElementsByTagName("p")[0];
    var editForm = blogElement.parentElement;
    var newTitleElement = blogElement.parentElement.getElementsByTagName("div")[0].getElementsByTagName("input")[0];
    var newTextElement = blogElement.parentElement.getElementsByTagName("div")[1].getElementsByTagName("textarea")[0]
    
    if (newTitleElement.value == "" || newTextElement.value == "") {
        alert("Please enter title and text for your edit.");
    } else {
        titleElement.innerHTML = newTitleElement.value;
        textElement.innerHTML = newTextElement.value;
    
        editForm.style.display = "none";
    }
    
    



}