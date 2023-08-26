
let form=document.querySelector(".form");
let category=document.querySelector("#category-selector");
let difficulty=document.querySelector("#difficulty-selector");
let numberOfQuestions=document.querySelector("#question-number");
let btn=document.querySelector("#start-quiz")
let questions;
let score=0;
let rowElement=document.querySelector(".row");
let userScore=document.querySelector(".score")
let userChoosedAns=false;
console.log(rowElement)

btn.addEventListener("click",async ()=>{
   
    let myQuiz=new Quiz(category.value,difficulty.value,numberOfQuestions.value);
    questions=await myQuiz.fetchApi();
    let myQuestions= new Questions(0,score);


console.log(questions);
form.classList.add("d-none")
myQuestions.displayQuestions()
})


class Quiz{

constructor(category,difficulty,questions){
    this.category=category
    this.difficulty=difficulty
    this.questions=questions
}


getApi(){

    return `https://opentdb.com/api.php?amount=${this.questions}&category=${this.category}&difficulty=${this.difficulty}`
}
async fetchApi(){
 let res=   await fetch(this.getApi());
let data=   await res.json();

return data.results;
}

}

class Questions{
    constructor(index){
        this.index=index
        this.question=questions[index].question;
        this.category=questions[index].category;
        this.correctAns=questions[index].correct_answer;
        this.difficulty=questions[index].difficulty;
        this.inCorrectAns=questions[index].incorrect_answers;
        this.allAnswers=this.getAnswers();
        
    }

    getQuestion(){
       return this.question;
    }

    getAnswers(){
        let allAnswers=[this.correctAns,...this.inCorrectAns];
        allAnswers.sort()
        return allAnswers;
    }

    displayQuestions(){
    let questionCard=`
    <div class=col-12 ">
    <div class="header d-flex justify-content-between"><span class="category btn p-2 mt-2">${this.category}</span><span  class="question-no btn p-2 mt-2">${this.index+1} of ${questions.length}</span></div>
    <div class="questions">
    <div class="question text-center mb-2" >${this.question}</div>
    <ul class="choices list-unstyled text-center d-flex flex-column justify-content-center align-items-center">
    
    ${this.allAnswers.map((e)=> `<li class="my-3 w-50 text-center">${e}</li>` ).join("")}
    </ul>
    </div>
    <div class="footer">
    <span class="d-block m-auto w-25 text-center">your score is ${score}</span>
    </div>
    </div>
    
    `
    rowElement.innerHTML= questionCard;

        let choices=document.querySelectorAll(".choices li");
        choices.forEach((choice)=>{

           
                choice.addEventListener("click",()=>{
                  console.log(userChoosedAns)
                    if(userChoosedAns!==true){
                        userChoosedAns=true;
                    this.checkingAnswer(choice);
                    
                    }
                })
            
            
        })


    }

    checkingAnswer(choice){
        
        this.index++;
        if(choice.innerHTML==this.correctAns){
            score++;
            console.log(score)
            choice.style="background-color:green";
            choice.classList.add("animate__animated")
            choice.classList.add("animate__bounce")
        }
        else{
            choice.style="background-color:red";
            choice.classList.add("animate__animated")
            choice.classList.add("animate__shakeX")
        }
        
      
setTimeout(()=>{
this.index < questions.length ? this.newQuestion() :  this.displayFinalScore();
    
},2000)
      
       
    }


    newQuestion (){
        
        userChoosedAns=false;
        let newQuestion=new Questions(this.index);
        
            newQuestion.displayQuestions();
    }

    displayFinalScore (){
        rowElement.classList.add("d-none");

        if(score==questions.length){
            userScore.innerHTML=` <div class="user-score p-2 border border-3"> congratulations <i class="fa-solid fa-trophy" style="color: #39df0c;"></i> your score is  ${score} of ${questions.length}</div>
            <div class="my-5 retry btn btn-secondary">retry</div>
            `
        }
        else{
            userScore.innerHTML=` <div class="user-score p-2 border border-3">your score is : ${score} of ${questions.length}</div>
            <div class="my-5 retry btn btn-secondary">retry</div>
            `
        }
       
        document.querySelector(".finalResult").classList.remove("d-none");
        document.querySelector(".retry").addEventListener("click",()=>{
            window.location.reload()
        })
    }
}




