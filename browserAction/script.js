URL = "http://localhost:8000/classify"

function showClassificationFromResponse(response){   
    response.json().then(json => {
        console.log(json.techniques);
        let techniques = json.techniques 

        switch (techniques.length) {
            case 0:
              document.getElementById('classification-none').style.display = "block";
              break;
            case 1:
              if (techniques[0] === 'Attack on Reputation') {
                document.getElementById('classification-attack-on-reputation').style.display = "block";
              } else if (techniques[0] === 'Manipulative Wording') {
                document.getElementById('classification-manipulative-wording').style.display = "block";
              }
              break;
            case 2:
                if (techniques[0] === 'Attack on Reputation' && techniques[1] === 'Manipulative Wording'){
                    document.getElementById('classification-both').style.display = "block";
                    break;
                }              
            default:
              console.log("Invalid techniques values. Please check the input.");
          }
            
        document.getElementById('classification-section').style.display = "block";
        document.getElementById('loadingModal').classList.remove('is-active')
    });

    
}

function hideClassification(){
    document.getElementById('classification-attack-on-reputation').style.display = "none";
    document.getElementById('classification-manipulative-wording').style.display = "none";
    document.getElementById('classification-both').style.display = "none";
    document.getElementById('classification-none').style.display = "none";
    document.getElementById('classification-section').style.display = "none";
}

function onSubmit(){
    console.log('On Submit');
    hideClassification();
    document.getElementById('loadingModal').classList.add('is-active');
    let text = document.getElementById('input-text').value
    let headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
    );
    let body = {'text': text}
    let init = {method: 'POST', headers, body: JSON.stringify(body)};
    let request = new Request(URL, init);
    fetch(request)
        .then(showClassificationFromResponse);
}



hideClassification();


document.getElementById('submit-button').addEventListener('click', onSubmit);