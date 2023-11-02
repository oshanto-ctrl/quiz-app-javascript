const username = document.getElementById("username");

const saveScoreBtn = document.getElementById("saveScoreBtn");

const mostRecentScore = localStorage.getItem("mostRecentScore");

const finalScore = document.getElementById("finalScore");

finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
console.log(JSON.parse(localStorage.getItem("highScores")));



username.addEventListener('keyup', () =>{
    //console.log(username.value);
    saveScoreBtn.disabled = !username.value;

});


saveHighScore = e => {
    console.log("Saved.");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    
    highScores.push(score);

    // Sort High Score Sortaion (Decrese order)
    highScores.sort((a,b) => b.score - a.score);

    // splice in top 5
    highScores.splice(5);

    // save
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    // Go to main page after save the name
    window.location.assign("/index.html");
    
    //console.log(highScores);

};







