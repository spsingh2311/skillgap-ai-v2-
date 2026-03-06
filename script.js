const analyzeBtn=document.getElementById("analyzeBtn")
const result=document.getElementById("result")
const roadmapBox=document.getElementById("roadmap")

analyzeBtn.addEventListener("click",()=>{

const skills=[]
const checked=document.querySelectorAll("input[type='checkbox']:checked")

checked.forEach(c=>{
skills.push(c.value)
})

let suggestions=""

if(!skills.includes("React"))
suggestions+="Learn React for frontend<br>"

if(!skills.includes("NodeJS"))
suggestions+="Learn NodeJS for backend<br>"

if(!skills.includes("MachineLearning"))
suggestions+="Machine Learning is a growing field<br>"

if(!skills.includes("Git"))
suggestions+="Learn Git for version control<br>"

if(suggestions==="")
suggestions="Your skill stack looks strong!"

result.innerHTML=suggestions


generateRoadmap(skills)

})


function generateRoadmap(skills){

let roadmap=[]

if(!skills.includes("HTML"))
roadmap.push("Start with HTML")

if(!skills.includes("CSS"))
roadmap.push("Learn CSS")

if(!skills.includes("JavaScript"))
roadmap.push("Learn JavaScript")

if(skills.includes("JavaScript") && !skills.includes("React"))
roadmap.push("Next: Learn React")

if(skills.includes("React") && !skills.includes("NodeJS"))
roadmap.push("Next: Learn NodeJS")

roadmapBox.innerHTML=roadmap.join("<br>")

}



document.getElementById("analyzeGithub").addEventListener("click",()=>{

const username=document.getElementById("githubUser").value

fetch(`https://api.github.com/users/${username}/repos`)
.then(res=>res.json())
.then(data=>{

let languages={}

data.forEach(repo=>{
if(repo.language){
languages[repo.language]=(languages[repo.language]||0)+1
}
})

let output="Languages used:<br>"

for(let lang in languages){
output+=lang+" : "+languages[lang]+" repos<br>"
}

document.getElementById("githubResult").innerHTML=output

})

})



const ctx=document.getElementById("demandChart")

new Chart(ctx,{
type:"bar",
data:{
labels:["JavaScript","React","Python","Machine Learning","Docker"],
datasets:[{
label:"Market Demand %",
data:[95,88,92,90,80]
}]
}
})

const marketBtn = document.getElementById("loadMarket")
const marketInfo = document.getElementById("marketInfo")

const jobData = {
JavaScript:95,
React:90,
Python:93,
MachineLearning:88,
NodeJS:85,
Docker:82,
AWS:87,
SQL:84
}

marketBtn.addEventListener("click",()=>{

let output="Top skills in job market:<br><br>"

for(let skill in jobData){
output += skill + " → " + jobData[skill] + "% demand<br>"
}

marketInfo.innerHTML = output

loadJobChart()

})

function loadJobChart(){

const ctx2=document.getElementById("jobChart")

new Chart(ctx2,{
type:"bar",
data:{
labels:Object.keys(jobData),
datasets:[{
label:"Market Demand %",
data:Object.values(jobData)
}]
}
})

}
const analyzeBtn = document.getElementById("analyzeBtn")
const githubResult = document.getElementById("githubResult")

analyzeBtn.addEventListener("click", analyzeGithub)

async function analyzeGithub(){

const username = document.getElementById("githubUser").value

if(username === ""){
githubResult.innerHTML="Please enter a username"
return
}

const url = "https://api.github.com/users/" + username

const response = await fetch(url)

const data = await response.json()

githubResult.innerHTML = `
<h3>${data.name}</h3>
<img src="${data.avatar_url}" width="100">
<p>Public Repositories: ${data.public_repos}</p>
<p>Followers: ${data.followers}</p>
<p>Following: ${data.following}</p>
<p>Profile: <a href="${data.html_url}" target="_blank">Visit GitHub</a></p>
`

}
