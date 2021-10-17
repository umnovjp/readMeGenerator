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
{type: 'rawlist',
    message: 'do you want to add image 1?',
    name: 'image1',
    choices: ['y', 'n'],
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
},
{
    type: 'Input',
    name: 'usageInfo',
    message: 'enter usage information',
},
{type: 'rawlist',
    message: 'do you want to add image 2?',
    name: 'image2',
    choices: ['y', 'n'],
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
    let image2 = data.image2;
    let usageInfo = data.usageInfo;
    let nameVar = data.name;
    let email = data.email;
    let git = data.github;
    let license = data.license;

    if (image1 === 'y') {image1Link = '![First image](/Images/image1.jpg) \nFigure 1: Elephant '}
    else {image1Link = '\nDude you could add a nice picture here'};
    if (image2 === 'y') {image2Link = '![Second image](/Images/image4.jpg) \nFigure2: Elephant with wings'}
    else {image2Link = '\nDude you could add a nice picture here'};
    // not too fancy way to get URL of license badge. Using object would be more fancy. I used two arrays instead. It is faster
    const choices = generateMarkdown.licenses;
    const choice = data.license; 
    const index = choices.indexOf(choice);
    // console.log(choices + ' ' + choice + ' ' + index);
    const URLs = generateMarkdown.licenseBadges;
    const URLShort = URLs[index]; // .split('(');
    // const altText = URLArray[0];
    // const altText2 = altText.replace('(','');
    // console.log(URLArray);
    // const URL = altText2 + '<img src="' + URLArray[1] + '">';
    const URL = '<img src="./' + URLShort + '">';
    console.log(URL);

    let layout = `
    # ${projectTitle}  
${URL}
## Project Description
\n${projectDescription} 


## List of Content
#### [Installation Instructions](#installation-instructions)
#### [Usage Information](#usage-information)
#### [Contributing](#contributing)
#### [License](#license)
#### [Questions](#questions) 
    \nGithub Link
    \nEmail

## Installation Instructions: 
${installInstr}
  
${image1Link}

## Usage Information: 
${usageInfo}  
  
${image2Link}

## Contributing: ${nameVar}

## License: 

this file is covered under ${license} license

## Questions
### My Github link is: (https://github.com/${git})
### Contact me by email if you have questions: (${email})
    `
    fs.writeFile('README.md', layout, function(err) {
        console.log(err)
    })
    
})