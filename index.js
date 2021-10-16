const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./generateMarkdown.js');
const license = 'license'; 

inquirer.prompt([
    {
        type: 'Input',
        name: 'projectTitle',
        message: 'what is your project title',
},
{
    type: 'Input',
    name: 'projectDescription',
    message: 'what is your project description',
},
{
    type: 'Input',
    name: 'installInstr',
    message: 'Enter Installation Instructions',
},
{type: 'rawlist',
    message: 'do you want to add image 1?',
    name: 'image1',
    choices: ['y', 'n'],
}
{
    type: 'Input',
    name: 'usageInfo',
    message: 'enter usage information',
},
    {
        type: 'Input',
        name: 'name',
        message: 'who contributed',
},
    {
        type: 'Input',
    message: 'what is your email address',
    name: 'email'
},
      
{type: 'Input',
    message: 'Github link',
    name: 'github'
},
{type: 'rawlist',
    message: 'choose your license',
    name: 'license',
    choices: generateMarkdown.licenses,
}
]).then((data) =>{
    console.log(data.name);
    
    let projectTitle = data.projectTitle;
    let projectDescription = data.projectDescription;
    let installInstr = data.installInstr;
    let image1 = data.image1;
    let usageInfo = data.usageInfo;
    let nameVar = data.name;
    let email = data.email;
    let git = data.github;
    let license = data.license;

    if (image1 === 'y') {image1Link = '![First image](/Images/image1.jpg)'}
    else {image1Link = 'Dude you could add a nice picture here'};
    // not too fancy way to get URL of license badge. Using object would be more fancy. I used two arrays instead. It is faster
    const choices = generateMarkdown.licenses;
    const choice = data.license; 
    const index = choices.indexOf(choice);
    console.log(choices + ' ' + choice + ' ' + index);
    const URLs = generateMarkdown.licenseBadges;
    const URL = URLs[index];
    console.log(URL);

    let layout = `#${projectTitle}

#Project Description
${projectDescription} ${URL}

# List of Content
    ## Installation Instructions
    ## Usage Information
    ## Contributing
    ## License
    ##Questions
        ###Github Link
        ###Email

#Installation Instructions
${installInstr}
${image1Link}

#Usage Information
${usageInfo}

#Contributing
${nameVar}

#License
this file is covered under ${license} license

#Questions
## My Github link is [Github](https://github.com/${git})
## My Email is [Email] ${email}
    `
    fs.writeFile('readme.md', layout, function(err) {
        console.log(err)
    })
    
})
