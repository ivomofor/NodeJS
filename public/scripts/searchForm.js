function sendSearchResault() {
    var x = document.forms["homePageSearchForm"]["homeSearchForm"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }