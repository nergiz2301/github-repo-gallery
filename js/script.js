const overview=document.querySelector(".overview");
//overview profile info appears
const username= "nergiz2301";
const repoList= document.querySelector(".repo-list");
const reposs=document.querySelector(".repos");
const repoData=document.querySelector(".repo-data")
const gitUserInfo= async function () {
    const userInfo= await fetch(`https://api.github.com/users/${username}`);
    const data= await userInfo.json();
    displayUserInfo(data);
};
gitUserInfo();

const displayUserInfo= function(data){
    const div = document.createElement("div");
    div.classList.add("user-info")
    div.innerHTML= `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong> Name:</strong> ${data.name}</p>
    <p><strong> Bio:</strong> ${data.bio}</p>
    <p><strong> Location:</strong> ${data.location}</p>
    <p><strong> Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
    overview.append(div);
    gitRepos();

};

const gitRepos= async function(){
  const fetchRepos= await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData= await fetchRepos.json();
  displayRepos(repoData);

};

const displayRepos= function(repos){
  for (const repo of repos){
    const repoItem=document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML=`<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function(e){
  if (e.target.matches("h3")){
  const repoName=e.target.innerText;
  gitRepoName(repoName);
  }
});

const gitRepoName= async function(repoName){
  const firstRepo= await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo= await firstRepo.json();
  console.log(repoInfo);

const fetchLanguages= await fetch(`https://github.com/nergiz2301/javascript-potluck`);
const languageData= await fetchLanguages.json();

const Languages= [];
for (const language in languageData){
  Langauges.push(language);
}
 displayRepoInfo(repoInfo,languages)
};

const displayRepoInfo= function(repoInfo,languages){
  repoData.innerHTML="";
  repoData.classList.remove("hide");
  reposs.classList.add("hide");
  const div=document.createElement("div");
  div.innerHTML=
  `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;
repoData.append(div);
};



