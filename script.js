// SKILL ANALYZER

const analyzeSkills=document.getElementById("analyzeSkills")
const result=document.getElementById("result")
const roadmapBox=document.getElementById("roadmap")

analyzeSkills.addEventListener("click",()=>{

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


// GITHUB ANALYZER

document.getElementById("analyzeGithub").addEventListener("click",async ()=>{

const username=document.getElementById("githubUser").value

if(username===""){
document.getElementById("githubResult").innerHTML="Enter GitHub username"
return
}

const userData=await fetch(`https://api.github.com/users/${username}`)
.then(res=>res.json())

const repoData=await fetch(`https://api.github.com/users/${username}/repos`)
.then(res=>res.json())

let languages={}

repoData.forEach(repo=>{
if(repo.language){
languages[repo.language]=(languages[repo.language]||0)+1
}
})

let output=`
<h3>${userData.name}</h3>
<img src="${userData.avatar_url}" width="100">
<p>Public Repositories: ${userData.public_repos}</p>
<p>Followers: ${userData.followers}</p>
<p><a href="${userData.html_url}" target="_blank">Visit GitHub</a></p>
<br>
<h4>Languages Used</h4>
`

for(let lang in languages){
output+=lang+" : "+languages[lang]+" repos<br>"
}

document.getElementById("githubResult").innerHTML=output

})


// JOB MARKET DEMAND

const marketBtn=document.getElementById("loadMarket")
const marketInfo=document.getElementById("marketInfo")

const jobData={
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
output+=skill+" → "+jobData[skill]+"% demand<br>"
}

marketInfo.innerHTML=output

loadJobChart()

})

function loadJobChart(){

const ctx=document.getElementById("jobChart")

new Chart(ctx,{
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
const resumeUpload=document.getElementById("resumeUpload")
const resumeResult=document.getElementById("resumeResult")

resumeUpload.addEventListener("change",function(e){

const file=e.target.files[0]

if(!file) return

const reader=new FileReader()

reader.onload=function(event){

const text=event.target.result.toLowerCase()

const keywords=[
"html","css","javascript","react","node",
"python","django","flask",
"machine learning","tensorflow","pytorch",
"sql","mongodb","docker","aws","azure"
]

let detected=[]

keywords.forEach(skill=>{
if(text.includes(skill)){
detected.push(skill)
}
})

if(detected.length>0){
resumeResult.innerHTML="Skills detected: "+detected.join(", ")
}else{
resumeResult.innerHTML="No major skills detected."
}

}

reader.readAsText(file)

})

